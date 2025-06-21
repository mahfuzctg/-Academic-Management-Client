import type { TEnrolledCourse } from "@/types/enrolledCourse";
// import type { TStudentMarks } from "@/types/studentMarks";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FC } from "react";

export type TStudentMarks = Record<
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

export const SubjectMarksTable: FC<{
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
        {(enrollment.selectedSubjects || []).map((subject: any) => {
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
                  required
                  min={20}
                  max={90}
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
                  required
                  min={20}
                  max={90}
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
                  required
                  min={20}
                  max={90}
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
                  required
                  min={20}
                  max={90}
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
