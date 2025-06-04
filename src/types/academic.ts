export interface AcademicYear {
  id: string;
  year: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  academicYearId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  headOfDepartment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  description?: string;
  departmentId: string;
  duration: number;
  totalCredits: number;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicStats {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalDepartments: number;
  totalPrograms: number;
  activeSemesters: number;
  enrollmentStats: {
    totalEnrollments: number;
    activeEnrollments: number;
    completedEnrollments: number;
  };
  courseStats: {
    totalOffered: number;
    activeCourses: number;
    completedCourses: number;
  };
}
