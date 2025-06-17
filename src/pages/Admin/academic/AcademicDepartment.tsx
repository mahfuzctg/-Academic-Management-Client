import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  useAddDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "@/redux/features/academic/academicApi";
import { FormFields } from "@/components/ui/form-field";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetAllAcademicFacultiesQuery } from "@/redux/features/academic/academicFacultyApi";
import { Input } from "@/components/ui/input";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  academicFaculty: z.string().min(1, "Academic faculty is required"),
  description: z.string().optional(),
  headOfDepartment: z.string().optional(),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

const AcademicDepartment = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: departments, isLoading } = useGetDepartmentsQuery(undefined);
  const { data: faculties } = useGetAllAcademicFacultiesQuery([]);
  const [addDepartment] = useAddDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      academicFaculty: "",
      description: "",
      headOfDepartment: "",
    },
  });

  const filteredDepartments = departments?.data?.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      if (selectedDepartment) {
        await updateDepartment({
          id: selectedDepartment._id,
          data,
        }).unwrap();
        toast({
          title: "Success",
          description: "Department updated successfully",
        });
      } else {
        await addDepartment(data).unwrap();
        toast({
          title: "Success",
          description: "Department added successfully",
        });
      }
      setIsOpen(false);
      form.reset();
      setSelectedDepartment(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save department",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (department: any) => {
    setSelectedDepartment(department);
    form.reset({
      name: department.name,
      academicFaculty: department.academicFaculty._id,
      description: department.description || "",
      headOfDepartment: department.headOfDepartment || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedDepartment) return;

    try {
      await deleteDepartment(selectedDepartment._id).unwrap();
      toast({
        title: "Success",
        description: "Department deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedDepartment(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete department",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Academic Departments
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage academic departments and their details
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedDepartment
                    ? "Edit Department"
                    : "Add New Department"}
                </DialogTitle>
                <DialogDescription>
                  {selectedDepartment
                    ? "Update the department information below."
                    : "Fill in the department information below."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormFields.TextWithIcon
                    form={form}
                    name="name"
                    label="Department Name"
                    placeholder="e.g., Computer Science"
                    required
                  />
                  <FormFields.Select
                    form={form}
                    name="academicFaculty"
                    label="Academic Faculty"
                    placeholder="Select academic faculty"
                    options={
                      faculties?.data?.map((faculty) => ({
                        label: faculty.name,
                        value: faculty._id,
                      })) || []
                    }
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="description"
                    label="Description"
                    placeholder="Enter department description"
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="headOfDepartment"
                    label="Head of Department"
                    placeholder="Enter head of department name"
                  />
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      {selectedDepartment
                        ? "Update Department"
                        : "Add Department"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-w-sm mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Academic Faculty</TableHead>
                  <TableHead>Head of Department</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments?.map((department: any) => (
                  <TableRow key={department._id}>
                    <TableCell className="font-medium">
                      {department.name}
                    </TableCell>
                    <TableCell>{department.academicFaculty?.name}</TableCell>
                    <TableCell>{department.headOfDepartment || "-"}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {department.description || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(department)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            setSelectedDepartment(department);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!isLoading && filteredDepartments?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No departments found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              department
              {selectedDepartment && ` "${selectedDepartment.name}"`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AcademicDepartment;
