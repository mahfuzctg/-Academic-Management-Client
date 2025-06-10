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
} from "@/redux/features/academic/academicApi";
import { FormFields } from "@/components/ui/form-field";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  code: z.string().min(1, "Department code is required"),
  description: z.string().min(1, "Description is required"),
  headOfDepartment: z.string().min(1, "Head of Department is required"),
  totalCredits: z.string().min(1, "Total credits is required"),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

const AcademicDepartment = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFormData | null>(null);

  const { data: departments, isLoading } = useGetDepartmentsQuery(undefined);
  const [addDepartment] = useAddDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      headOfDepartment: "",
      totalCredits: "",
    },
  });

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      if (selectedDepartment) {
        await updateDepartment(data).unwrap();
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

  const handleEdit = (department: DepartmentFormData) => {
    setSelectedDepartment(department);
    form.reset(department);
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Academic Departments</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Department</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedDepartment ? "Edit Department" : "Add New Department"}
              </DialogTitle>
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
                <FormFields.TextWithIcon
                  form={form}
                  name="code"
                  label="Department Code"
                  placeholder="e.g., CS"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="description"
                  label="Description"
                  placeholder="Department description"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="headOfDepartment"
                  label="Head of Department"
                  placeholder="e.g., Dr. John Doe"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="totalCredits"
                  label="Total Credits"
                  placeholder="e.g., 120"
                  required
                />
                <Button type="submit" className="w-full">
                  {selectedDepartment ? "Update Department" : "Add Department"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Head of Department</TableHead>
              <TableHead>Total Credits</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments?.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.code}</TableCell>
                <TableCell>{department.headOfDepartment}</TableCell>
                <TableCell>{department.totalCredits}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
};

export default AcademicDepartment;
