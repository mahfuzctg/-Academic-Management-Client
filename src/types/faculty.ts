export type TFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
};

export type TFaculty = {
  id: string;
  designation: string;
  name: TFacultyName;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: string;
  dateOfBirth?: string;
  gender?: string;
  presentAddress?: string;
  permanentAddress?: string;
  profileImg: string;
  academicDepartment?: TAcademicDepartment;
};
