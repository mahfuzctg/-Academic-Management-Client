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
