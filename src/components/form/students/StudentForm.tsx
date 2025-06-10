import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TStudent } from "@/types/student";
import {
  useAddStudentMutation,
  useUpdateStudentMutation,
} from "@/redux/features/student/studentApi";
import { useToast } from "@/components/ui/use-toast";
import {
  createStudentValidationSchema,
  updateStudentValidationSchema,
} from "@/schema/studentFormSchema";
import { useState } from "react";

type StudentFormData = z.infer<typeof createStudentValidationSchema>;

interface StudentFormProps {
  student?: TStudent;
  onSuccess?: () => void;
}

const StudentForm = ({ student, onSuccess }: StudentFormProps) => {
  const { toast } = useToast();
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(
      student ? updateStudentValidationSchema : createStudentValidationSchema
    ) as Resolver<StudentFormData>,
    defaultValues: student || {
      name: {
        firstName: "John",
        middleName: "William",
        lastName: "Doe",
      },
      gender: "male",
      dateOfBirth: "2000-01-01",
      email: "john.doe@example.com",
      contactNo: "+1234567890",
      emergencyContactNo: "+1987654321",
      bloodGroup: "A+",
      presentAddress: "123 Main Street, City, State 12345",
      permanentAddress: "456 Home Avenue, Hometown, State 67890",
      guardian: {
        fatherName: "Robert Doe",
        fatherOccupation: "Engineer",
        fatherContactNo: "+1122334455",
        motherName: "Mary Doe",
        motherOccupation: "Teacher",
        motherContactNo: "+1555666777",
      },
      localGuardian: {
        name: "James Smith",
        occupation: "Business Owner",
        contactNo: "+1888999000",
        address: "789 Local Street, City, State 54321",
      },
      admissionSemester: "fall2023",
      academicDepartment: "computer-science",
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      const formData = new FormData();
      const studentData = {
        password: "123456",
        student: data,
      };
      formData.append("data", JSON.stringify(studentData));

      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      if (student) {
        await updateStudent({
          id: student.id,
          updatedData: data,
        }).unwrap();
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
      } else {
        await addStudent(formData as any).unwrap();
        toast({
          title: "Success",
          description: "Student added successfully",
        });
      }
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save student data",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{student ? "Edit Student" : "Add New Student"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                {/* Image Upload Field */}
                <div className="flex flex-col gap-2">
                  <FormLabel>Profile Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {selectedImage && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name.middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="presentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Present Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permanentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permanent Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guardian.fatherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardian.fatherOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Occupation</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guardian.fatherContactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardian.motherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guardian.motherOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Occupation</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardian.motherContactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Local Guardian Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="localGuardian.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Guardian's Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="localGuardian.occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Guardian's Occupation</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="localGuardian.contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Guardian's Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="localGuardian.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Guardian's Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="admissionSemester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Semester</FormLabel>
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
                            <SelectItem value="fall2023">Fall 2023</SelectItem>
                            <SelectItem value="spring2024">
                              Spring 2024
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="academicDepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="computer-science">
                              Computer Science
                            </SelectItem>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                {student ? "Update Student" : "Add Student"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentForm;
