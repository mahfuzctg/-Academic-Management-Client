export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  prerequisites: string[];
  department: string;
  level: "undergraduate" | "graduate";
  status: "active" | "inactive";
}

export interface CourseOffering {
  id: string;
  subjectId: string;
  subject: Subject;
  semester: number;
  academicYear: string;
  instructorId: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  capacity: number;
  enrolledStudents: number;
  schedule: {
    day: string;
    time: string;
    room: string;
  };
  status: "open" | "closed" | "cancelled";
  registrationDeadline: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseOfferingId: string;
  courseOffering: CourseOffering;
  status: "registered" | "dropped" | "completed";
  registrationDate: string;
  grade?: string;
}

export interface EnrollmentFilters {
  semester?: number;
  academicYear?: string;
  department?: string;
  search?: string;
  status?: CourseOffering["status"];
}

export interface EnrollmentFormData {
  courseOfferingId: string;
  studentId: string;
}

export interface ICourse {
  id: string;
  name?: string;
  code?: string;
  department?: string;
  title?: string;
  prefix?: string;
  credits?: number;
  prerequisites?: string[] | any;
  instructor?: string;
}
