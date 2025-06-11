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

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faculty must be string",
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faculty must be string",
    }),
  }),
});

type AcademicFacultyFormData = z.infer<
  typeof createAcademicFacultyValidationSchema
>;

const AcademicFacultyPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const { data: faculties, isLoading } =
    useGetAllAcademicFacultiesQuery(undefined);
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();

  const form = useForm<AcademicFacultyFormData>({
    resolver: zodResolver(
      selectedFaculty
        ? updateAcademicFacultyValidationSchema
        : createAcademicFacultyValidationSchema
    ),
    defaultValues: {
      body: {
        name: "",
      },
    },
  });

  const onSubmit = async (data: AcademicFacultyFormData) => {
    try {
      if (selectedFaculty) {
        await updateAcademicFaculty({
          id: selectedFaculty.id,
          data,
        }).unwrap();
        toast({
          title: "Success",
          description: "Academic faculty updated successfully",
        });
      } else {
        await createAcademicFaculty(data).unwrap();
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
      body: {
        name: faculty.name,
      },
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
                  name="body.name"
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
              <TableRow key={faculty.id}>
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
