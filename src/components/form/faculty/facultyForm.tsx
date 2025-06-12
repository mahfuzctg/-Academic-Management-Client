import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddFacultyMutation,
  useUpdateFacultyMutation,
} from "@/redux/features/facultys/facultyApi";
import {
  useGetAcademicFacultiesQuery,
  useGetAcademicDepartmentsQuery,
} from "@/redux/features/admin/academicManagement.api";
import type { TFaculty } from "@/types/faculty";
import { useEffect } from "react";
import { CustomFormField } from "@/components/ui/form-field";

const formSchema = z.object({
  id: z.string().min(1, "ID is required"),
  designation: z.string().min(1, "Designation is required"),
  name: z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(20, "Name cannot be more than 20 characters"),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(20, "Name cannot be more than 20 characters"),
  }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  profileImg: z.string().optional(),
  academicDepartment: z.string().min(1, "Academic Department is required"),
  academicFaculty: z.string().min(1, "Academic Faculty is required"),
});

interface FacultyFormProps {
  faculty?: TFaculty;
  onSuccess: () => void;
}

export default function FacultyForm({ faculty, onSuccess }: FacultyFormProps) {
  const [addFaculty] = useAddFacultyMutation();
  const [updateFaculty] = useUpdateFacultyMutation();

  // Fetch academic departments and faculties
  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useGetAcademicDepartmentsQuery(undefined);
  const { data: facultiesData, isLoading: isFacultiesLoading } =
    useGetAcademicFacultiesQuery(undefined);

  // Add console logs to debug data loading
  console.log("Departments Data:", departmentsData);
  console.log("Faculties Data:", facultiesData);
  console.log("Departments Loading:", isDepartmentsLoading);
  console.log("Faculties Loading:", isFacultiesLoading);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: faculty
      ? {
          id: faculty.id,
          designation: faculty.designation,
          name: faculty.name,
          gender: faculty.gender,
          dateOfBirth: faculty.dateOfBirth?.toString(),
          email: faculty.email,
          contactNo: faculty.contactNo,
          emergencyContactNo: faculty.emergencyContactNo,
          bloodGroup: faculty.bloodGroup,
          presentAddress: faculty.presentAddress,
          permanentAddress: faculty.permanentAddress,
          profileImg: faculty.profileImg,
          academicDepartment: faculty.academicDepartment,
          academicFaculty: faculty.academicFaculty,
        }
      : {
          id: "",
          designation: "",
          name: {
            firstName: "",
            middleName: "",
            lastName: "",
          },
          gender: "male",
          dateOfBirth: "",
          email: "",
          contactNo: "",
          emergencyContactNo: "",
          bloodGroup: "A+",
          presentAddress: "",
          permanentAddress: "",
          profileImg: "",
          academicDepartment: "",
          academicFaculty: "",
        },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (faculty) {
        await updateFaculty({ id: faculty.id, data }).unwrap();
      } else {
        await addFaculty(data).unwrap();
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            form={form}
            name="name.firstName"
            label="First Name"
            placeholder="John"
            required
          />
          <CustomFormField
            form={form}
            name="name.lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            form={form}
            name="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
            required
          />
          <CustomFormField
            form={form}
            name="designation"
            label="Designation"
            placeholder="Assistant Professor"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            form={form}
            name="contactNo"
            label="Contact Number"
            placeholder="+1234567890"
            required
          />
          <CustomFormField
            form={form}
            name="emergencyContactNo"
            label="Emergency Contact"
            placeholder="+1234567890"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            form={form}
            name="gender"
            label="Gender"
            required
            customRender={({ value, onChange }) => (
              <select
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          <CustomFormField
            form={form}
            name="bloodGroup"
            label="Blood Group"
            customRender={({ value, onChange }) => (
              <select
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            form={form}
            name="presentAddress"
            label="Present Address"
            placeholder="Enter present address"
            required
            customRender={({ value, onChange }) => (
              <Textarea
                value={value}
                onChange={onChange}
                placeholder="Enter present address"
              />
            )}
          />
          <CustomFormField
            form={form}
            name="permanentAddress"
            label="Permanent Address"
            placeholder="Enter permanent address"
            required
            customRender={({ value, onChange }) => (
              <Textarea
                value={value}
                onChange={onChange}
                placeholder="Enter permanent address"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            form={form}
            name="academicFaculty"
            label="Academic Faculty"
            required
            customRender={({ value, onChange }) => (
              <select
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select Faculty</option>
                {facultiesData?.data?.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            )}
          />
          <CustomFormField
            form={form}
            name="academicDepartment"
            label="Academic Department"
            required
            disabled={!form.watch("academicFaculty")}
            customRender={({ value, onChange }) => (
              <select
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select Department</option>
                {departmentsData?.data?.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit">
            {faculty ? "Update Faculty" : "Add Faculty"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
