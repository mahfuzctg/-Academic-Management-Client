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
  useGetAllAcademicFacultiesQuery,
  useUpdateAcademicFacultyMutation,
  useCreateAcademicFacultyMutation,
  useDeleteAcademicFacultyMutation,
} from "@/redux/features/academic/academicFacultyApi";
import { FormFields } from "@/components/ui/form-field";
import { Pencil, Trash2, Plus } from "lucide-react";
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

const academicFacultyValidationSchema = z.object({
  name: z.string().min(1, "Academic faculty name is required"),
});

type AcademicFacultyFormData = z.infer<typeof academicFacultyValidationSchema>;

const AcademicFacultyPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const { data: faculties, isLoading } = useGetAllAcademicFacultiesQuery({
    page: 1,
    limit: 10,
  });
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();
  const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();

  const form = useForm<AcademicFacultyFormData>({
    resolver: zodResolver(academicFacultyValidationSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (facultyData: AcademicFacultyFormData) => {
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

  const handleDelete = async () => {
    if (!selectedFaculty) return;

    try {
      await deleteAcademicFaculty(selectedFaculty._id).unwrap();
      toast({
        title: "Success",
        description: "Academic faculty deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedFaculty(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete academic faculty",
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Academic Faculty Management
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Faculty
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedFaculty
                    ? "Edit Academic Faculty"
                    : "Add New Academic Faculty"}
                </DialogTitle>
                <DialogDescription>
                  {selectedFaculty
                    ? "Update the academic faculty information below."
                    : "Fill in the academic faculty information below."}
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
                    label="Academic Faculty Name"
                    placeholder="Enter academic faculty name"
                    required
                  />
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      {selectedFaculty ? "Update Faculty" : "Add Faculty"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculties?.data?.map((faculty: any) => (
                  <TableRow key={faculty._id}>
                    <TableCell className="font-medium">
                      {faculty.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(faculty)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            setSelectedFaculty(faculty);
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
              academic faculty
              {selectedFaculty && ` "${selectedFaculty.name}"`}.
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

export default AcademicFacultyPage;
