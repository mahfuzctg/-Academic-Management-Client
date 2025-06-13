import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
} from "@/redux/features/course/offerCourseApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Days } from "@/types/offeredCourse";
import { X } from "lucide-react";

// Validation Schema
const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  }
);

const createOfferedCourseValidationSchema = z
  .object({
    semesterRegistration: z
      .string()
      .min(1, "Semester registration is required"),
    academicFaculty: z.string().min(1, "Academic faculty is required"),
    academicDepartment: z.string().min(1, "Academic department is required"),
    course: z.string().min(1, "Course is required"),
    faculty: z.string().min(1, "Faculty is required"),
    section: z.string().min(1, "Section is required"),
    maxCapacity: z.string().min(1, "Max capacity is required"),
    image: z.string().url().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  })
  .refine(
    (data) => {
      const start = new Date(`1970-01-01T${data.startTime}:00`);
      const end = new Date(`1970-01-01T${data.endTime}:00`);
      return end > start;
    },
    {
      message: "Start time should be before End time!",
      path: ["endTime"],
    }
  );

type TOfferedCourseFormValues = z.infer<
  typeof createOfferedCourseValidationSchema
>;

interface OfferedCourseFormProps {
  offeredCourse?: {
    id: string;
    semesterRegistration: string;
    academicFaculty: string;
    academicDepartment: string;
    course: string;
    faculty: string;
    section: number;
    maxCapacity: number;
    image?: string;
    days: Days[];
    startTime: string;
    endTime: string;
  };
  onSuccess?: () => void;
}

const OfferedCourseForm = ({
  offeredCourse,
  onSuccess,
}: OfferedCourseFormProps) => {
  const { toast } = useToast();
  const [createOfferedCourse] = useCreateOfferedCourseMutation();
  const [updateOfferedCourse] = useUpdateOfferedCourseMutation();

  const form = useForm<TOfferedCourseFormValues>({
    resolver: zodResolver(createOfferedCourseValidationSchema),
    defaultValues: {
      semesterRegistration: offeredCourse?.semesterRegistration || "",
      academicFaculty: offeredCourse?.academicFaculty || "",
      academicDepartment: offeredCourse?.academicDepartment || "",
      course: offeredCourse?.course || "",
      faculty: offeredCourse?.faculty || "",
      section: offeredCourse?.section?.toString() || "",
      maxCapacity: offeredCourse?.maxCapacity?.toString() || "",
      image: offeredCourse?.image || "",
      days: offeredCourse?.days || [],
      startTime: offeredCourse?.startTime || "",
      endTime: offeredCourse?.endTime || "",
    },
  });

  const onSubmit = async (data: TOfferedCourseFormValues) => {
    try {
      const formattedData = {
        ...data,
        section: parseInt(data.section),
        maxCapacity: parseInt(data.maxCapacity),
      };

      if (offeredCourse) {
        await updateOfferedCourse({
          id: offeredCourse.id,
          data: formattedData,
        }).unwrap();
        toast({
          title: "Success",
          description: "Offered course updated successfully",
        });
      } else {
        await createOfferedCourse(formattedData).unwrap();
        toast({
          title: "Success",
          description: "Offered course created successfully",
        });
      }

      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {offeredCourse ? "Edit Offered Course" : "Add New Offered Course"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="semesterRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Semester Registration{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter semester registration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="academicFaculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Academic Faculty <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter academic faculty" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="academicDepartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Academic Department{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter academic department"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Course <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Faculty <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter faculty" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Section <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter section"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Max Capacity <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter max capacity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Start Time <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      End Time <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Days <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="grid grid-cols-4 gap-2">
                    {Days.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes(day)}
                          onCheckedChange={(checked) => {
                            const currentDays = field.value || [];
                            if (checked) {
                              field.onChange([...currentDays, day]);
                            } else {
                              field.onChange(
                                currentDays.filter((d) => d !== day)
                              );
                            }
                          }}
                        />
                        <label className="text-sm">{day}</label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {offeredCourse
                ? "Update Offered Course"
                : "Create Offered Course"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OfferedCourseForm;
