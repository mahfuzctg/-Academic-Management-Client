import type { TEnrolledCourse } from "@/types/enrolledCourse";
import type { FC } from "react";

interface GradingHistoryTableProps {
  history: TEnrolledCourse[];
  calculateGrade: (total: number) => string;
  getResultStatus: (total: number) => string;
}

const getStudentFullName = (student: TEnrolledCourse["student"]) => {
  const { firstName, middleName, lastName } = student.name;
  return [firstName, middleName, lastName].filter(Boolean).join(" ");
};

const GradingHistoryTable: FC<GradingHistoryTableProps> = ({
  history,
  calculateGrade,
  getResultStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border rounded-lg">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 font-medium">Student</th>
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium">Subject</th>
            <th className="px-4 py-3 font-medium">Class Test 1</th>
            <th className="px-4 py-3 font-medium">Class Test 2</th>
            <th className="px-4 py-3 font-medium">Mid Term</th>
            <th className="px-4 py-3 font-medium">Final Term</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Grade</th>
            <th className="px-4 py-3 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.flatMap((enrollment) =>
              enrollment.subjectMarks && enrollment.subjectMarks.length > 0
                ? enrollment.subjectMarks.map((subjectMark, idx) => {
                    const total =
                      subjectMark.marks.classTest1 +
                      subjectMark.marks.classTest2 +
                      subjectMark.marks.midTerm +
                      subjectMark.marks.finalTerm;
                    const grade = calculateGrade(total);
                    const result = getResultStatus(total);
                    return (
                      <tr
                        key={`${enrollment.student.id}-${subjectMark.subjectName}-${idx}`}
                      >
                        <td className="px-4 py-2 border">
                          {getStudentFullName(enrollment.student)} (
                          {enrollment.student.id})
                        </td>
                        <td className="px-4 py-2 border">
                          {enrollment.course.title}
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {subjectMark.subjectName}
                        </td>
                        <td className="px-4 py-2 border">
                          {subjectMark.marks.classTest1}
                        </td>
                        <td className="px-4 py-2 border">
                          {subjectMark.marks.classTest2}
                        </td>
                        <td className="px-4 py-2 border">
                          {subjectMark.marks.midTerm}
                        </td>
                        <td className="px-4 py-2 border">
                          {subjectMark.marks.finalTerm}
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {total}
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {grade}
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {result}
                        </td>
                      </tr>
                    );
                  })
                : []
            )
          ) : (
            <tr>
              <td className="px-4 py-2 border text-center" colSpan={10}>
                No grading history found for this course.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradingHistoryTable;
