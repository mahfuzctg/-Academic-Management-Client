import { zodResolver } from "@hookform/resolvers/zod";
import { useAddSemesterRegistrationMutation } from "@/redux/features/SemesterRegistrations/SemesterRegistrationApi";
import { useForm } from "react-hook-form";
import { useGetAllAcademicSemestersQuery } from "@/redux/features/academicSemester/academicSemesterApi";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const semesterRegistrationSchema = z.object({
  academicSemester: z.string().min(1, "Academic Semester is required"),
  status: z.enum(["UPCOMING", "ONGOING", "ENDED"]),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  minCredit: z.number().min(0, "Min Credit must be a positive number"),
  maxCredit: z.number().min(0, "Max Credit must be a positive number"),
});

type TSemesterRegistration = z.infer<typeof semesterRegistrationSchema>;

const SemesterRegistrationFrom = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
  const { data: academicSemesters } =
    useGetAllAcademicSemestersQuery(undefined);

  const form = useForm<TSemesterRegistration>({
    resolver: zodResolver(semesterRegistrationSchema),
    defaultValues: {
      academicSemester: "",
      status: "UPCOMING",
      startDate: "",
      endDate: "",
      minCredit: 0,
      maxCredit: 0,
    },
  });

  const onSubmit = async (data: TSemesterRegistration) => {
    try {
      const res = await addSemesterRegistration(data).unwrap();
      if (res?.success) {
        toast.success("Semester Registration created successfully!");
        form.reset();
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  const academicSemesterOptions = academicSemesters?.data?.map(
    (semester: any) => ({
      value: semester._id,
      label: `${semester.name} ${semester.year}`,
    })
  );

  const statusOptions = [
    { value: "UPCOMING", label: "Upcoming" },
    { value: "ONGOING", label: "Ongoing" },
    { value: "ENDED", label: "Ended" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Semester Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="academicSemester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {academicSemesterOptions?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minCredit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Credit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxCredit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Credit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full md:w-auto">
            Create Semester Registration
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SemesterRegistrationFrom;
