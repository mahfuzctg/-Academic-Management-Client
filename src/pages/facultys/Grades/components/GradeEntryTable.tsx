import { Input } from "@/components/ui/input";
import type { TEnrolledCourse } from "@/types/enrolledCourse";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState, type FC } from "react";

type TStudentMarks = Record<
  string, // studentId
  Record<
    string, // subjectName
    {
      classTest1: number;
      classTest2: number;
      midTerm: number;
      finalTerm: number;
    }
  >
>;

interface GradeEntryTableProps {
  studentsForCourse: TEnrolledCourse[];
  studentMarks: TStudentMarks;
  handleMarkChange: (
    studentId: string,
    subjectName: string,
    field: keyof TEnrolledCourse["courseMarks"],
    value: string
  ) => void;
  calculateGrade: (total: number) => string;
  getResultStatus: (total: number) => string;
  selectedCourseId: string;
}

const GradeEntryTable: FC<GradeEntryTableProps> = ({
  studentsForCourse,
  studentMarks,
  handleMarkChange,
  calculateGrade,
  getResultStatus,
  selectedCourseId,
}) => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const toggleStudentExpansion = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border rounded-lg">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-medium w-12"></th>
            <th className="px-4 py-3 font-medium">Student</th>
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium text-center">
              Subjects Enrolled
            </th>
          </tr>
        </thead>
        <tbody>
          {studentsForCourse.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                {selectedCourseId
                  ? "No students found for this course."
                  : "Please select a course."}
              </td>
            </tr>
          ) : (
            studentsForCourse.map((enrollment) => (
              <StudentRow
                key={enrollment.student.id}
                enrollment={enrollment}
                isExpanded={expandedStudent === enrollment.student.id}
                onToggle={toggleStudentExpansion}
                studentMarks={studentMarks}
                handleMarkChange={handleMarkChange}
                calculateGrade={calculateGrade}
                getResultStatus={getResultStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const StudentRow: FC<{
  enrollment: TEnrolledCourse;
  isExpanded: boolean;
  onToggle: (studentId: string) => void;
  studentMarks: TStudentMarks;
  handleMarkChange: (
    studentId: string,
    subjectName: string,
    field: keyof TEnrolledCourse["courseMarks"],
    value: string
  ) => void;
  calculateGrade: (total: number) => string;
  getResultStatus: (total: number) => string;
}> = ({
  enrollment,
  isExpanded,
  onToggle,
  studentMarks,
  handleMarkChange,
  calculateGrade,
  getResultStatus,
}) => {
  const studentFullName = `${enrollment.student.name.firstName} ${
    enrollment.student.name.middleName || ""
  } ${enrollment.student.name.lastName}`;

  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => onToggle(enrollment.student.id)}
      >
        <td className="px-4 py-2 border text-center">
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </td>
        <td className="px-4 py-2 border font-semibold">
          {studentFullName} ({enrollment.student.id})
        </td>
        <td className="px-4 py-2 border">{enrollment.course.title}</td>
        <td className="px-4 py-2 border text-center">
          {enrollment.selectedSubjects?.length || 0}
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={4} className="p-0 border-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-gray-50 dark:bg-gray-900/50"
              >
                <div className="p-4">
                  <h4 className="font-semibold mb-2 text-base">
                    Subject Marks for {studentFullName}
                  </h4>
                  <SubjectMarksTable
                    enrollment={enrollment}
                    studentId={enrollment.student.id}
                    studentMarks={studentMarks}
                    handleMarkChange={handleMarkChange}
                    calculateGrade={calculateGrade}
                    getResultStatus={getResultStatus}
                  />
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
};

const SubjectMarksTable: FC<{
  enrollment: TEnrolledCourse;
  studentId: string;
  studentMarks: TStudentMarks;
  handleMarkChange: (
    studentId: string,
    subjectName: string,
    field: keyof TEnrolledCourse["courseMarks"],
    value: string
  ) => void;
  calculateGrade: (total: number) => string;
  getResultStatus: (total: number) => string;
}> = ({
  enrollment,
  studentId,
  studentMarks,
  handleMarkChange,
  calculateGrade,
  getResultStatus,
}) => {
  return (
    <table className="min-w-full text-sm text-left border rounded-lg bg-white dark:bg-gray-800">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="px-3 py-2 font-medium">Subject</th>
          <th className="px-3 py-2 font-medium">Class Test 1</th>
          <th className="px-3 py-2 font-medium">Class Test 2</th>
          <th className="px-3 py-2 font-medium">Mid Term</th>
          <th className="px-3 py-2 font-medium">Final Term</th>
          <th className="px-3 py-2 font-medium">Total</th>
          <th className="px-3 py-2 font-medium">Grade</th>
          <th className="px-3 py-2 font-medium">Result</th>
          <th className="px-3 py-2 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {(enrollment.selectedSubjects || []).map((subject) => {
          const marksObj = studentMarks[studentId]?.[subject] || {
            classTest1: 0,
            classTest2: 0,
            midTerm: 0,
            finalTerm: 0,
          };
          const total =
            marksObj.classTest1 +
            marksObj.classTest2 +
            marksObj.midTerm +
            marksObj.finalTerm;
          const grade = calculateGrade(total);
          const result = getResultStatus(total);

          const subjectGradeInfo = enrollment.subjectMarks?.find(
            (sm) => sm.subjectName === subject
          );
          const isGraded = !!subjectGradeInfo;

          return (
            <tr key={subject} className={isGraded ? "bg-green-50" : ""}>
              <td className="px-3 py-2 border font-medium">{subject}</td>
              <td className="px-3 py-2 border">
                <Input
                  type="number"
                  min={0}
                  max={25}
                  value={
                    isGraded
                      ? subjectGradeInfo.marks.classTest1
                      : marksObj.classTest1
                  }
                  onChange={(e) =>
                    handleMarkChange(
                      studentId,
                      subject,
                      "classTest1",
                      e.target.value
                    )
                  }
                  className="w-24"
                  disabled={isGraded}
                />
              </td>
              <td className="px-3 py-2 border">
                <Input
                  type="number"
                  min={0}
                  max={25}
                  value={
                    isGraded
                      ? subjectGradeInfo.marks.classTest2
                      : marksObj.classTest2
                  }
                  onChange={(e) =>
                    handleMarkChange(
                      studentId,
                      subject,
                      "classTest2",
                      e.target.value
                    )
                  }
                  className="w-24"
                  disabled={isGraded}
                />
              </td>
              <td className="px-3 py-2 border">
                <Input
                  type="number"
                  min={0}
                  max={25}
                  value={
                    isGraded ? subjectGradeInfo.marks.midTerm : marksObj.midTerm
                  }
                  onChange={(e) =>
                    handleMarkChange(
                      studentId,
                      subject,
                      "midTerm",
                      e.target.value
                    )
                  }
                  className="w-24"
                  disabled={isGraded}
                />
              </td>
              <td className="px-3 py-2 border">
                <Input
                  type="number"
                  min={0}
                  max={25}
                  value={
                    isGraded
                      ? subjectGradeInfo.marks.finalTerm
                      : marksObj.finalTerm
                  }
                  onChange={(e) =>
                    handleMarkChange(
                      studentId,
                      subject,
                      "finalTerm",
                      e.target.value
                    )
                  }
                  className="w-24"
                  disabled={isGraded}
                />
              </td>
              <td className="px-3 py-2 border font-semibold">{total}</td>
              <td className="px-3 py-2 border font-semibold">{grade}</td>
              <td className="px-3 py-2 border font-semibold">{result}</td>
              <td className="px-4 py-2 border">
                {isGraded ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 size={16} />
                    Graded
                  </span>
                ) : (
                  <span className="text-yellow-600">Pending</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GradeEntryTable;
