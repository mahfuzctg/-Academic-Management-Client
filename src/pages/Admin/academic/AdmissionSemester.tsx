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
  useAddSemesterMutation,
  useGetSemestersQuery,
  useUpdateSemesterMutation,
} from "@/redux/features/academic/academicApi";
import {
  type Semester,
  type CreateSemesterDto,
  type UpdateSemesterDto,
} from "@/types/academic";
import { FormFields } from "@/components/ui/form-field";

const semesterSchema = z.object({
  name: z.string().min(1, "Semester name is required"),
  year: z.string().min(1, "Year is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  isActive: z.boolean().default(false),
});

type SemesterFormData = z.infer<typeof semesterSchema>;

const AdmissionSemester = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(
    null
  );

  const { data: semesters, isLoading } = useGetSemestersQuery(undefined);
  const [addSemester] = useAddSemesterMutation();
  const [updateSemester] = useUpdateSemesterMutation();

  const form = useForm<SemesterFormData>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      name: "",
      year: "",
      startDate: "",
      endDate: "",
      isActive: false,
    },
  });

  const onSubmit = async (data: SemesterFormData) => {
    try {
      if (selectedSemester) {
        const updateData: UpdateSemesterDto = {
          id: selectedSemester.id,
          ...data,
        };
        await updateSemester(updateData).unwrap();
        toast({
          title: "Success",
          description: "Semester updated successfully",
        });
      } else {
        const createData: CreateSemesterDto = data;
        await addSemester(createData).unwrap();
        toast({
          title: "Success",
          description: "Semester added successfully",
        });
      }
      setIsOpen(false);
      form.reset();
      setSelectedSemester(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save semester",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (semester: Semester) => {
    setSelectedSemester(semester);
    form.reset({
      name: semester.name,
      year: semester.year,
      startDate: semester.startDate,
      endDate: semester.endDate,
      isActive: semester.isActive,
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
        <h1 className="text-2xl font-bold">Admission Semesters</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Semester</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSemester ? "Edit Semester" : "Add New Semester"}
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
                  label="Semester Name"
                  placeholder="e.g., Fall 2024"
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="year"
                  label="Year"
                  placeholder="e.g., 2024"
                  required
                />
                <FormFields.Date
                  form={form}
                  name="startDate"
                  label="Start Date"
                  required
                />
                <FormFields.Date
                  form={form}
                  name="endDate"
                  label="End Date"
                  required
                />
                <FormFields.Checkbox
                  form={form}
                  name="isActive"
                  label="Active Semester"
                />
                <Button type="submit" className="w-full">
                  {selectedSemester ? "Update Semester" : "Add Semester"}
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
              <TableHead>Semester Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters?.map((semester) => (
              <TableRow key={semester.id}>
                <TableCell>{semester.name}</TableCell>
                <TableCell>{semester.year}</TableCell>
                <TableCell>
                  {new Date(semester.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(semester.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      semester.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {semester.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(semester)}
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

export default AdmissionSemester;
