import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "@/redux/features/student/studentApi";
import { useToast } from "@/components/ui/use-toast";
import {
  createStudentValidationSchema,
  updateStudentValidationSchema,
} from "@/schema/studentFormSchema";
import { useState } from "react";
import { FormFields } from "@/components/ui/form-field";

type StudentFormData = z.infer<typeof createStudentValidationSchema>;

interface StudentFormProps {
  student?: TStudent;
  onSuccess?: () => void;
}

const StudentForm = ({ student, onSuccess }: StudentFormProps) => {
  const { toast } = useToast();
  const [createStudent] = useCreateStudentMutation();
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

      if (student) {
        await updateStudent({
          id: student.id,
          data,
        }).unwrap();
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
      } else {
        await createStudent(formData as any).unwrap();
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
                  <FormFields.TextWithIcon
                    form={form}
                    name="profileImage"
                    label="Profile Image"
                    type="file"
                    onChange={handleImageChange}
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
                  <FormFields.TextWithIcon
                    form={form}
                    name="name.firstName"
                    label="First Name"
                    placeholder="Enter first name"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="name.middleName"
                    label="Middle Name"
                    placeholder="Enter middle name"
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="name.lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormFields.Select
                    form={form}
                    name="gender"
                    label="Gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                    required
                  />
                  <FormFields.DatePicker
                    form={form}
                    name="dateOfBirth"
                    label="Date of Birth"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="email"
                    label="Email"
                    type="email"
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="emergencyContactNo"
                    label="Emergency Contact Number"
                    placeholder="Enter emergency contact"
                    required
                  />
                  <FormFields.Select
                    form={form}
                    name="bloodGroup"
                    label="Blood Group"
                    options={[
                      { label: "A+", value: "A+" },
                      { label: "A-", value: "A-" },
                      { label: "B+", value: "B+" },
                      { label: "B-", value: "B-" },
                      { label: "AB+", value: "AB+" },
                      { label: "AB-", value: "AB-" },
                      { label: "O+", value: "O+" },
                      { label: "O-", value: "O-" },
                    ]}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="presentAddress"
                    label="Present Address"
                    placeholder="Enter present address"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="permanentAddress"
                    label="Permanent Address"
                    placeholder="Enter permanent address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="guardian.fatherName"
                    label="Father's Name"
                    placeholder="Enter father's name"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="guardian.fatherOccupation"
                    label="Father's Occupation"
                    placeholder="Enter father's occupation"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="guardian.fatherContactNo"
                    label="Father's Contact Number"
                    placeholder="Enter father's contact"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="guardian.motherName"
                    label="Mother's Name"
                    placeholder="Enter mother's name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="guardian.motherOccupation"
                    label="Mother's Occupation"
                    placeholder="Enter mother's occupation"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="guardian.motherContactNo"
                    label="Mother's Contact Number"
                    placeholder="Enter mother's contact"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Local Guardian Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="localGuardian.name"
                    label="Local Guardian's Name"
                    placeholder="Enter local guardian's name"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="localGuardian.occupation"
                    label="Local Guardian's Occupation"
                    placeholder="Enter local guardian's occupation"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormFields.TextWithIcon
                    form={form}
                    name="localGuardian.contactNo"
                    label="Local Guardian's Contact Number"
                    placeholder="Enter local guardian's contact"
                    required
                  />
                  <FormFields.TextWithIcon
                    form={form}
                    name="localGuardian.address"
                    label="Local Guardian's Address"
                    placeholder="Enter local guardian's address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormFields.Select
                    form={form}
                    name="admissionSemester"
                    label="Admission Semester"
                    options={[
                      { label: "Fall 2023", value: "fall2023" },
                      { label: "Spring 2024", value: "spring2024" },
                    ]}
                    required
                  />
                  <FormFields.Select
                    form={form}
                    name="academicDepartment"
                    label="Academic Department"
                    options={[
                      { label: "Computer Science", value: "computer-science" },
                      { label: "Engineering", value: "engineering" },
                      { label: "Business", value: "business" },
                      { label: "Arts", value: "arts" },
                    ]}
                    required
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
