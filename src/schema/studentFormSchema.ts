import { z } from "zod";

export const studentFormSchema = z.object({
  name: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
  }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  emergencyContactNo: z
    .string()
    .min(10, "Emergency contact number must be at least 10 digits"),
  bloogGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  guardian: z.object({
    fatherName: z
      .string()
      .min(2, "Father's name must be at least 2 characters"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z
      .string()
      .min(10, "Father's contact number must be at least 10 digits"),
    motherName: z
      .string()
      .min(2, "Mother's name must be at least 2 characters"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z
      .string()
      .min(10, "Mother's contact number must be at least 10 digits"),
  }),
  localGuardian: z.object({
    name: z
      .string()
      .min(2, "Local guardian's name must be at least 2 characters"),
    occupation: z.string().min(1, "Local guardian's occupation is required"),
    contactNo: z
      .string()
      .min(10, "Local guardian's contact number must be at least 10 digits"),
    address: z.string().min(1, "Local guardian's address is required"),
  }),
  profileImg: z.string().optional(),
  admissionSemester: z.string().min(1, "Admission semester is required"),
  academicDepartment: z.string().min(1, "Academic department is required"),
  academicFaculty: z.string().min(1, "Academic faculty is required"),
});
