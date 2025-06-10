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
  useGetAllFacultiesQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} from "@/redux/features/faculty/facultyApi";
import { FormFields } from "@/components/ui/form-field";
import type { Faculty } from "@/types/academic";

const facultySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(1, "Contact number is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
});

type FacultyFormData = z.infer<typeof facultySchema>;

const Faculty = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const { data: faculties, isLoading } = useGetAllFacultiesQuery(undefined);
  const [updateFaculty] = useUpdateFacultyMutation();
  const [deleteFaculty] = useDeleteFacultyMutation();

  const form = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      designation: "",
      department: "",
    },
  });

  const onSubmit = async (data: FacultyFormData) => {
    try {
      if (selectedFaculty) {
        await updateFaculty({
          id: selectedFaculty.id,
          data,
        }).unwrap();
        toast({
          title: "Success",
          description: "Faculty updated successfully",
        });
      }
      setIsOpen(false);
      form.reset();
      setSelectedFaculty(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save faculty",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    form.reset({
      firstName: faculty.firstName,
      lastName: faculty.lastName,
      email: faculty.email,
      contactNo: faculty.contactNo,
      designation: faculty.designation,
      department: faculty.department,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaculty(id).unwrap();
      toast({
        title: "Success",
        description: "Faculty deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete faculty",
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Faculty</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedFaculty ? "Edit Faculty" : "Add New Faculty"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormFields.TextWithIcon
                  form={form}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="contactNo"
                  label="Contact Number"
                  placeholder="Enter contact number"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="designation"
                  label="Designation"
                  placeholder="Enter designation"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="department"
                  label="Department"
                  placeholder="Enter department"
                  required
                />
                <Button type="submit" className="w-full">
                  {selectedFaculty ? "Update Faculty" : "Add Faculty"}
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculties?.data?.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell>
                  {faculty.firstName} {faculty.lastName}
                </TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.contactNo}</TableCell>
                <TableCell>{faculty.designation}</TableCell>
                <TableCell>{faculty.department}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(faculty)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(faculty.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
};

export default Faculty;
