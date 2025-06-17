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
  useCreateAcademicSemesterMutation,
  useGetAllAcademicSemestersQuery,
  useUpdateAcademicSemesterMutation,
} from "@/redux/features/academic/academicSemesterApi";
import {
  type Semester,
  type CreateSemesterDto,
  AcademicSemesterName,
  AcademicSemesterCode,
  Months,
} from "@/types/academic";
import { FormFields } from "@/components/ui/form-field";

const semesterSchema = z.object({
  name: z.nativeEnum(AcademicSemesterName, {
    required_error: "Semester name is required",
  }),
  year: z.string().min(1, "Year is required"),
  code: z.nativeEnum(AcademicSemesterCode, {
    required_error: "Semester code is required",
  }),
  startMonth: z.nativeEnum(Months, {
    required_error: "Start month is required",
  }),
  endMonth: z.nativeEnum(Months, {
    required_error: "End month is required",
  }),
});

type SemesterFormData = z.infer<typeof semesterSchema>;

const AdmissionSemester = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(
    null
  );

  const { data: semesters, isLoading } = useGetAllAcademicSemestersQuery([]);
  const [addSemester] = useCreateAcademicSemesterMutation();
  const [updateSemester] = useUpdateAcademicSemesterMutation();

  const form = useForm<SemesterFormData>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      name: AcademicSemesterName.AUTUMN,
      year: "",
      code: AcademicSemesterCode.AUTUMN,
      startMonth: Months.JANUARY,
      endMonth: Months.DECEMBER,
    },
  });

  const onSubmit = async (data: SemesterFormData) => {
    try {
      if (selectedSemester) {
        const updateData = {
          id: selectedSemester.id,
          data: {
            name: data.name,
            year: data.year,
            code: data.code,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
          },
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
      code: semester.code,
      startMonth: semester.startMonth,
      endMonth: semester.endMonth,
    });
    setIsOpen(true);
  };

  // Convert enum values to select options format
  const semesterNameOptions = Object.values(AcademicSemesterName).map(
    (value) => ({
      label: value,
      value: value,
    })
  );

  const semesterCodeOptions = Object.values(AcademicSemesterCode).map(
    (value) => ({
      label: value,
      value: value,
    })
  );

  const monthOptions = Object.values(Months).map((value) => ({
    label: value,
    value: value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Academic Semesters</h1>
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
                <FormFields.Select
                  form={form}
                  name="name"
                  label="Semester Name"
                  options={semesterNameOptions}
                  required
                />
                <FormFields.TextWithIcon
                  form={form}
                  name="year"
                  label="Year"
                  placeholder="e.g., 2024"
                  required
                />
                <FormFields.Select
                  form={form}
                  name="code"
                  label="Semester Code"
                  options={semesterCodeOptions}
                  required
                />
                <FormFields.Select
                  form={form}
                  name="startMonth"
                  label="Start Month"
                  options={monthOptions}
                  required
                />
                <FormFields.Select
                  form={form}
                  name="endMonth"
                  label="End Month"
                  options={monthOptions}
                  required
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
              <TableHead>Code</TableHead>
              <TableHead>Start Month</TableHead>
              <TableHead>End Month</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters?.data?.map((semester: any) => (
              <TableRow key={semester.id}>
                <TableCell>{semester.name}</TableCell>
                <TableCell>{semester.year}</TableCell>
                <TableCell>{semester.code}</TableCell>
                <TableCell>{semester.startMonth}</TableCell>
                <TableCell>{semester.endMonth}</TableCell>
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
