import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { setSelectedStudent } from "@/redux/features/studentSlice";
import type { RootState } from "@/redux/store";
import type { TStudent } from "@/types/student";
import { useState } from "react";
import {
  useGetAllStudentsQuery,
  useDeleteStudentMutation,
} from "@/redux/features/student/studentApi";

interface StudentListProps {
  onEdit: (student: TStudent) => void;
}

const StudentList = ({ onEdit }: StudentListProps) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    faculty: "",
    semester: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<TStudent | null>(null);

  const {
    data: studentsData,
    isLoading,
    error,
  } = useGetAllStudentsQuery(filters);
  const [deleteStudent] = useDeleteStudentMutation();

  const students = studentsData?.data || [];

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setFilters((prev) => ({ ...prev, department: value }));
  };

  const handleFacultyChange = (value: string) => {
    setFilters((prev) => ({ ...prev, faculty: value }));
  };

  const handleSemesterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, semester: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      department: "",
      faculty: "",
      semester: "",
    });
  };

  const handleEdit = (student: TStudent) => {
    dispatch(setSelectedStudent(student));
    onEdit(student);
  };

  const handleDelete = (student: TStudent) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await deleteStudent(studentToDelete.id).unwrap();
        setDeleteDialogOpen(false);
        setStudentToDelete(null);
      } catch (error) {
        console.error("Failed to delete student:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search students..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
              />
              <Select
                value={filters.department}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.faculty}
                onValueChange={handleFacultyChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.semester}
                onValueChange={handleSemesterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall2023">Fall 2023</SelectItem>
                  <SelectItem value="spring2024">Spring 2024</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student: TStudent) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      {`${student.name.firstName} ${
                        student.name.middleName
                          ? student.name.middleName + " "
                          : ""
                      }${student.name.lastName}`}
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.contactNo}</TableCell>
                    <TableCell>{student.academicDepartment}</TableCell>
                    <TableCell>{student.academicFaculty}</TableCell>
                    <TableCell>{student.admissionSemester}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(student)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(student)}
                            className="cursor-pointer text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              student record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default StudentList;
