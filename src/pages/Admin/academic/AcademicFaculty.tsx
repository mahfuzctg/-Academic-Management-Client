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
  useGetAllAcademicFacultiesQuery,
  useUpdateAcademicFacultyMutation,
  useCreateAcademicFacultyMutation,
} from "@/redux/features/academic/academicFacultyApi";
import { FormFields } from "@/components/ui/form-field";

const academicFacultyValidationSchema = z.object({
  name: z.string().min(1, "Academic faculty name is required"),
});

type AcademicFacultyFormData = z.infer<typeof academicFacultyValidationSchema>;

const AcademicFacultyPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const { data: faculties, isLoading } = useGetAllAcademicFacultiesQuery({
    page: 1,
    limit: 10,
  });
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();

  const form = useForm<AcademicFacultyFormData>({
    resolver: zodResolver(academicFacultyValidationSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (facultyData: AcademicFacultyFormData) => {
    console.log(facultyData);
    try {
      if (selectedFaculty) {
        await updateAcademicFaculty({
          id: selectedFaculty._id,
          data: { name: facultyData.name },
        }).unwrap();
        toast({
          title: "Success",
          description: "Academic faculty updated successfully",
        });
      } else {
        await createAcademicFaculty({ name: facultyData.name }).unwrap();
        toast({
          title: "Success",
          description: "Academic faculty created successfully",
        });
      }
      setIsOpen(false);
      form.reset();
      setSelectedFaculty(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save academic faculty",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (faculty: any) => {
    setSelectedFaculty(faculty);
    form.reset({
      name: faculty.name,
    });
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
        <h1 className="text-2xl font-bold">Academic Faculty Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Academic Faculty</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedFaculty
                  ? "Edit Academic Faculty"
                  : "Add New Academic Faculty"}
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
                  label="Academic Faculty Name"
                  placeholder="Enter academic faculty name"
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculties?.data?.map((faculty: any) => (
              <TableRow key={faculty._id}>
                <TableCell>{faculty.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(faculty)}
                    >
                      Edit
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

export default AcademicFacultyPage;
