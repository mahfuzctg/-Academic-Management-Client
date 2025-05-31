export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactNumber: string;
  enrollmentDate: string;
  academicDetails: {
    studentId: string;
    department: string;
    program: string;
    currentSemester: number;
    gpa: number;
    status: "active" | "inactive" | "graduated" | "on_leave";
    enrollmentDate: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    contactNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StudentFormData
  extends Omit<Student, "id" | "createdAt" | "updatedAt"> {}

export interface StudentFilters {
  search?: string;
  department?: string;
  status?: Student["academicDetails"]["status"];
  semester?: number;
}
