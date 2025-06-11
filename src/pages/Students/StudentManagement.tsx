import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import StudentForm from "@/components/form/students/StudentForm";
import StudentList from "@/components/form/students/StudentList";
import type { TStudent } from "@/types/student";
import { useGetAllStudentsQuery } from "@/redux/features/student/studentApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetSemestersQuery,
  useGetDepartmentsQuery,
} from "@/redux/features/academic/academicApi";
import { Pagination } from "@/components/ui/pagination";

export default function StudentManagement() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<
    TStudent | undefined
  >();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  // Get semesters and departments for filters
  const { data: semestersData } = useGetSemestersQuery(undefined);
  const { data: departmentsData } = useGetDepartmentsQuery(undefined);

  // Prepare query parameters
  const queryParams = [
    { name: "page", value: page.toString() },
    { name: "limit", value: limit.toString() },
  ];

  if (selectedSemester && selectedSemester !== "all") {
    queryParams.push({ name: "admissionSemester", value: selectedSemester });
  }

  if (selectedDepartment && selectedDepartment !== "all") {
    queryParams.push({ name: "academicDepartment", value: selectedDepartment });
  }

  // Get students with filters
  const { data: studentsData, isLoading } = useGetAllStudentsQuery(queryParams);

  const handleEdit = (student: TStudent) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedStudent(undefined);
    toast({
      title: "Success",
      description: selectedStudent
        ? "Student updated successfully"
        : "Student added successfully",
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage student profiles, academic records, and personal information
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <StudentForm
              student={selectedStudent}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Student List</CardTitle>
            <div className="flex gap-4">
              <Select
                value={selectedSemester}
                onValueChange={handleSemesterChange}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semestersData?.data?.map((semester) => (
                    <SelectItem key={semester._id} value={semester._id}>
                      {semester.name} {semester.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDepartment}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departmentsData?.data?.map((department) => (
                    <SelectItem key={department._id} value={department._id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <StudentList
            onEdit={handleEdit}
            students={studentsData?.data || []}
            isLoading={isLoading}
          />

          {studentsData?.meta && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(studentsData.meta.total / limit)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
