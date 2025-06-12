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
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/course/courseApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

// Validation Schema
const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  prefix: z.string().min(1, "Prefix is required"),
  code: z.string().min(1, "Code is required"),
  credits: z.string().min(1, "Credits is required"),
  preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
});

type TCourseFormValues = z.infer<typeof createCourseValidationSchema>;

interface CourseFormProps {
  course?: {
    id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses?: { course: string; isDeleted?: boolean }[];
    isDeleted?: boolean;
  };
  onSuccess?: () => void;
}

const CourseForm = ({ course, onSuccess }: CourseFormProps) => {
  const { toast } = useToast();
  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const { data: availableCourses } = useGetAllCoursesQuery();

  const form = useForm<TCourseFormValues>({
    resolver: zodResolver(createCourseValidationSchema),
    defaultValues: {
      title: course?.title || "",
      prefix: course?.prefix || "",
      code: course?.code?.toString() || "",
      credits: course?.credits?.toString() || "",
      preRequisiteCourses: course?.preRequisiteCourses || [],
      isDeleted: course?.isDeleted || false,
    },
  });

  const onSubmit = async (data: TCourseFormValues) => {
    try {
      const formattedData = {
        ...data,
        code: parseInt(data.code),
        credits: parseInt(data.credits),
      };

      if (course) {
        await updateCourse({
          id: course.id,
          data: {
            ...formattedData,
            code: formattedData.code.toString(),
          },
        }).unwrap();
        toast({
          title: "Success",
          description: "Course updated successfully",
        });
      } else {
        await createCourse(formattedData).unwrap();
        toast({
          title: "Success",
          description: "Course created successfully",
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
        <CardTitle>{course ? "Edit Course" : "Add New Course"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Prefix <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course prefix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter course code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Credits <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter course credits"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preRequisiteCourses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prerequisite Courses</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const currentPrereqs = field.value || [];
                        if (
                          !currentPrereqs.some(
                            (prereq) => prereq.course === value
                          )
                        ) {
                          field.onChange([
                            ...currentPrereqs,
                            { course: value, isDeleted: false },
                          ]);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select prerequisite course" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCourses?.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <div className="mt-2 space-y-2">
                    {field.value?.map((prereq, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <span>
                          {
                            availableCourses?.find(
                              (course) => course.id === prereq.course
                            )?.title
                          }
                        </span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newPrereqs = field.value?.filter(
                              (_, i) => i !== index
                            );
                            field.onChange(newPrereqs);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDeleted"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Mark as Deleted</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {course ? "Update Course" : "Create Course"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
