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
import { MoreHorizontal, Pencil, Trash2, BookOpen } from "lucide-react";
import {
  fetchInstructors,
  setFilters,
  clearFilters,
  deleteInstructor,
  setSelectedInstructor,
} from "@/redux/features/instructorSlice";
import type { RootState } from "@/redux/store";
import type { Instructor } from "@/types/instructor";
import { useState } from "react";

interface InstructorListProps {
  onEdit: (instructor: Instructor) => void;
  onViewSubjects: (instructor: Instructor) => void;
}

const InstructorList = ({ onEdit, onViewSubjects }: InstructorListProps) => {
  const dispatch = useDispatch();
  const { instructors, loading, error, filters } = useSelector(
    (state: RootState) => state.instructors
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] =
    useState<Instructor | null>(null);

  useEffect(() => {
    dispatch(fetchInstructors(filters));
  }, [dispatch, filters]);

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleDepartmentChange = (value: string) => {
    dispatch(setFilters({ department: value }));
  };

  const handleStatusChange = (value: string) => {
    dispatch(setFilters({ status: value as Instructor["status"] }));
  };

  const handleRoleChange = (value: string) => {
    dispatch(setFilters({ role: value as Instructor["role"] }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleEdit = (instructor: Instructor) => {
    dispatch(setSelectedInstructor(instructor));
    onEdit(instructor);
  };

  const handleDelete = (instructor: Instructor) => {
    setInstructorToDelete(instructor);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (instructorToDelete) {
      await dispatch(deleteInstructor(instructorToDelete.id));
      setDeleteDialogOpen(false);
      setInstructorToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error}
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
          <CardTitle>Instructor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search instructors..."
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
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="head">Department Head</SelectItem>
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
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructors.map((instructor) => (
                  <TableRow key={instructor.id}>
                    <TableCell>{`${instructor.firstName} ${instructor.lastName}`}</TableCell>
                    <TableCell>{instructor.department}</TableCell>
                    <TableCell>{instructor.designation}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          instructor.role === "head"
                            ? "bg-purple-100 text-purple-800"
                            : instructor.role === "admin"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {instructor.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          instructor.status === "active"
                            ? "bg-green-100 text-green-800"
                            : instructor.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {instructor.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {instructor.academicDetails.experience} years
                    </TableCell>
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
                            onClick={() => onViewSubjects(instructor)}
                            className="cursor-pointer"
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Subjects
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(instructor)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(instructor)}
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
              instructor record.
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

export default InstructorList;
