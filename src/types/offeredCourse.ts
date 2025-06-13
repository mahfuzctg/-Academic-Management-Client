export interface TCourse {
  _id: string;
  title: string;
  code: string;
}

export interface TFaculty {
  _id: string;
  fullName: string;
  email?: string;
}

export interface TAcademicDepartment {
  _id: string;
  name: string;
}

export interface TAcademicFaculty {
  _id: string;
  name: string;
}

export interface TAcademicSemester {
  _id: string;
  name: string;
  year: string;
}

export interface TSemesterRegistration {
  _id: string;
  status: string;
}

export type Days =
  | "SATURDAY"
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY";

export interface IOfferedCourse {
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
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOfferedCourse {
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
}

export interface IUpdateOfferedCourse {
  faculty?: string;
  maxCapacity?: number;
  days?: Days[];
  startTime?: string;
  endTime?: string;
}
