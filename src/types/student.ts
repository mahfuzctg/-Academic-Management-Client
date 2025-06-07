export interface TUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface TStudent {
  id: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export type StudentFormData = Omit<
  TStudent,
  "id" | "createdAt" | "updatedAt" | "isDeleted"
>;

export interface StudentFilters {
  search?: string;
  department?: string;
  faculty?: string;
  semester?: string;
}
