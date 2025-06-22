import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import type { TEnrolledCourse } from "@/types/enrolledCourse";
import { useGetMyEnrolledCoursesQuery } from "@/redux/features/enrollmentCourse/enrollmentCourseApi";
import GradingHistoryTable from "./GradingHistoryTable";

/**
 * @description Calculates the best 3 class test marks from 4 class tests
 * @param {number} ct1 - Class Test 1 marks
 * @param {number} ct2 - Class Test 2 marks
 * @param {number} ct3 - Class Test 3 marks
 * @param {number} ct4 - Class Test 4 marks
 * @returns {number} Sum of best 3 class test marks (max 60)
 */
const calculateBestThreeCT = (
  ct1: number,
  ct2: number,
  ct3: number,
  ct4: number
): number => {
  const marks = [ct1, ct2, ct3, ct4].map((mark) => Math.min(mark, 20)); // Cap each CT at 20
  marks.sort((a, b) => b - a); // Sort in descending order
  return marks.slice(0, 3).reduce((sum, mark) => sum + mark, 0); // Sum of best 3
};

/**
 * @description Calculates the final total marks with the new grading system
 * @param {number} ct1 - Class Test 1 marks
 * @param {number} ct2 - Class Test 2 marks
 * @param {number} ct3 - Class Test 3 marks
 * @param {number} ct4 - Class Test 4 marks
 * @param {number} finalExam - Final Exam marks
 * @returns {number} Final total marks (capped at 210)
 */
const calculateFinalTotal = (
  ct1: number,
  ct2: number,
  ct3: number,
  ct4: number,
  finalExam: number
): number => {
  const bestThreeCT = calculateBestThreeCT(ct1, ct2, ct3, ct4);
  const finalExamCapped = Math.min(finalExam, 210); // Cap final exam at 210
  const total = bestThreeCT + finalExamCapped;
  return Math.min(total, 210); // Cap total at 210
};

/**
 * @description Calculates the letter grade based on total marks.
 * @param {number} marks - The total marks.
 * @returns {string} The letter grade.
 * @author Sp-y-d-e-r
 */
function calculateGrade(marks: number) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

/**
 * @description Determines the result status (PASS/FAIL) based on total marks.
 * @param {number} marks - The total marks.
 * @returns {string} The result status.
 * @author Sp-y-d-e-r
 */
function getResultStatus(marks: number) {
  return marks >= 50 ? "PASS" : "FAIL";
}

/**
 * @description The main component for the student grades page.
 * It displays the student's grades and provides an option to register for the next semester.
 * @returns {JSX.Element} The rendered component.
 * @author Sp-y-d-e-r
 */
export default function StudentGradesPage() {
  const { data: enrolledCoursesData, isLoading } =
    useGetMyEnrolledCoursesQuery(undefined);
  const enrolledCourses: TEnrolledCourse[] = enrolledCoursesData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TEnrolledCourse | null>(
    null
  );
  const [registrationData, setRegistrationData] = useState({
    preferredSubjects: "",
    academicGoals: "",
    additionalNotes: "",
  });

  /**
   * @description Opens the registration modal for a specific course.
   * @param {TEnrolledCourse} course - The course for which to register.
   */
  const openRegistrationModal = (course: TEnrolledCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  /**
   * @description Handles the submission of the registration form.
   */
  const handleRegistrationSubmit = async () => {
    try {
      // Here you would typically make an API call to register for the next semester
      console.log("Registration data:", {
        courseId: selectedCourse?.course.id,
        ...registrationData,
      });

      toast.success("Registration submitted successfully!");
      setIsModalOpen(false);
      setRegistrationData({
        preferredSubjects: "",
        academicGoals: "",
        additionalNotes: "",
      });
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.");
    }
  };

  /**
   * @description Filters courses that the student has passed.
   */
  const passedCourses = enrolledCourses.filter((course) => course.isPassed);

  /**
   * @description Filters courses that the student has failed.
   */
  const failedCourses = enrolledCourses.filter((course) => !course.isPassed);

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header with Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            My Academic Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Passed Courses</h3>
              <p className="text-2xl font-bold text-green-600">
                {passedCourses.length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800">Failed Courses</h3>
              <p className="text-2xl font-bold text-red-600">
                {failedCourses.length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total Courses</h3>
              <p className="text-2xl font-bold text-blue-600">
                {enrolledCourses.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passed Courses Section */}
      {passedCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Passed Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {passedCourses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg p-4 bg-green-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {course.course.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Grade: {course.grade} | Status: PASS
                      </p>
                      {course.subjectMarks &&
                        course.subjectMarks.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">
                              Subject Marks:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                              {course.subjectMarks.map((subject) => {
                                const total = calculateFinalTotal(
                                  subject.marks.classTest1 ?? 0,
                                  subject.marks.classTest2 ?? 0,
                                  subject.marks.classTest3 ?? 0,
                                  subject.marks.classTest4 ?? 0,
                                  subject.marks.finalExam ?? 0
                                );
                                const bestThreeCT = calculateBestThreeCT(
                                  subject.marks.classTest1 ?? 0,
                                  subject.marks.classTest2 ?? 0,
                                  subject.marks.classTest3 ?? 0,
                                  subject.marks.classTest4 ?? 0
                                );
                                return (
                                  <div
                                    key={subject.subjectName}
                                    className="text-xs bg-white p-2 rounded"
                                  >
                                    <p className="font-medium">
                                      {subject.subjectName}
                                    </p>
                                    <p>Best 3 CT: {bestThreeCT}</p>
                                    <p>Final: {subject.marks.finalExam ?? 0}</p>
                                    <p>Total: {total}</p>
                                    <p>Grade: {calculateGrade(total)}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                    <Button
                      onClick={() => openRegistrationModal(course)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Register Next Semester
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Failed Courses Section */}
      {failedCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Failed Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {failedCourses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg p-4 bg-red-50"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {course.course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Grade: {course.grade} | Status: FAIL
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      You need to retake this course.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Grade Report</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading grades...</p>
          ) : (
            <GradingHistoryTable
              history={enrolledCourses}
              calculateGrade={calculateGrade}
              getResultStatus={getResultStatus}
            />
          )}
        </CardContent>
      </Card>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register for Next Semester</DialogTitle>
            <DialogDescription>
              Please provide information for your next semester registration.
              {selectedCourse && (
                <p className="mt-2 font-medium">
                  Course: {selectedCourse.course.title}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preferredSubjects" className="text-right">
                Preferred Subjects
              </Label>
              <Input
                id="preferredSubjects"
                value={registrationData.preferredSubjects}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    preferredSubjects: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="e.g., Mathematics, Physics, Computer Science"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicGoals" className="text-right">
                Academic Goals
              </Label>
              <Input
                id="academicGoals"
                value={registrationData.academicGoals}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    academicGoals: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="e.g., Improve GPA, Learn new skills"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalNotes" className="text-right">
                Additional Notes
              </Label>
              <Input
                id="additionalNotes"
                value={registrationData.additionalNotes}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    additionalNotes: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="Any additional information..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleRegistrationSubmit}>
              Submit Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
