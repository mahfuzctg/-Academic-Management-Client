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
  fetchStudents,
  setFilters,
  clearFilters,
} from "@/redux/features/studentSlice";
import type { RootState } from "@/redux/store";
import type { Student } from "@/types/student";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error, filters } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents(filters));
  }, [dispatch, filters]);

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleDepartmentChange = (value: string) => {
    dispatch(setFilters({ department: value }));
  };

  const handleStatusChange = (value: string) => {
    dispatch(
      setFilters({ status: value as Student["academicDetails"]["status"] })
    );
  };

  const handleSemesterChange = (value: string) => {
    dispatch(setFilters({ semester: parseInt(value) }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            <div className="flex gap-4">
              <Input
                placeholder="Search students..."
                value={filters.search || ""}
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
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.semester?.toString()}
                onValueChange={handleSemesterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>GPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.academicDetails.studentId}</TableCell>
                  <TableCell>{student.academicDetails.department}</TableCell>
                  <TableCell>{student.academicDetails.program}</TableCell>
                  <TableCell>
                    {student.academicDetails.currentSemester}
                  </TableCell>
                  <TableCell>{student.academicDetails.status}</TableCell>
                  <TableCell>
                    {student.academicDetails.gpa.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentList;
