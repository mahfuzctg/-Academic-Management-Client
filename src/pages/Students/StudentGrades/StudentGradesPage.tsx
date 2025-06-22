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
import {
  useGetMeQuery,
  useUpdateStudentMutation,
} from "@/redux/features/student/studentApi";
import { useGetAllSemesterRegistrationsQuery } from "@/redux/features/semesterRegistration/semesterRegistrationApi";

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

function calculateGrade(marks: number) {
  // Convert marks to percentage (210 is 100%)
  const percentage = (marks / 210) * 100;

  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function getResultStatus(marks: number) {
  // Convert marks to percentage (210 is 100%)
  const percentage = (marks / 210) * 100;
  return percentage >= 50 ? "PASS" : "FAIL";
}

export default function StudentGradesPage() {
  const { data: enrolledCoursesData, isLoading: coursesLoading } =
    useGetMyEnrolledCoursesQuery(undefined);

  const { data: semesterRegistrations } =
    useGetAllSemesterRegistrationsQuery(undefined);
  const [updateOwnProfile, { isLoading: updateLoading }] =
    useUpdateStudentMutation();

  const enrolledCourses: TEnrolledCourse[] = enrolledCoursesData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TEnrolledCourse | null>(
    null
  );

  const { data: student } = useGetMeQuery();
  const [registrationData, setRegistrationData] = useState({
    preferredSubjects: "",
    academicGoals: "",
    additionalNotes: "",
  });

  /**
   * @description Gets the next semester ID from semester registrations
   * @returns {string | null} The next semester ID or null if not found
   */
  const getNextSemesterId = (): string | null => {
    if (!semesterRegistrations?.data) return null;

    // Get current student's admission semester
    const currentStudent = enrolledCoursesData?.data?.[0]?.student;
    const currentSemester = currentStudent?.admissionSemester;

    if (!currentSemester) return null;

    // Find current semester in registrations to get its details
    const currentSemesterData = semesterRegistrations.data.find(
      (semester) => semester._id === currentSemester
    );

    if (!currentSemesterData?.academicSemester) return null;

    // Determine next semester based on current semester name
    const currentSemesterName = currentSemesterData.academicSemester.name;
    let nextSemesterName: string;

    if (currentSemesterName === "1st Semester") {
      nextSemesterName = "2nd Semester";
    } else if (currentSemesterName === "2nd Semester") {
      nextSemesterName = "3rd Semester";
    } else if (currentSemesterName === "3rd Semester") {
      nextSemesterName = "4th Semester";
    } else if (currentSemesterName === "4th Semester") {
      nextSemesterName = "5th Semester";
    } else if (currentSemesterName === "5th Semester") {
      nextSemesterName = "6th Semester";
    } else if (currentSemesterName === "6th Semester") {
      nextSemesterName = "7th Semester";
    } else if (currentSemesterName === "7th Semester") {
      nextSemesterName = "8th Semester";
    } else {
      // If already in 8th semester or unknown, return null
      return null;
    }

    // Find the next semester
    const nextSemester = semesterRegistrations.data.find(
      (semester) => semester.academicSemester?.name === nextSemesterName
    );

    return nextSemester?._id || null;
  };

  /**
   * @description Opens the registration modal for a specific course.
   * @param {TEnrolledCourse} course - The course for which to register.
   */
  const openRegistrationModal = (course: TEnrolledCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  /**
   * @description Handles the registration submission and updates student's admission semester
   */
  const handleRegistrationSubmit = async () => {
    try {
      const nextSemesterId = getNextSemesterId();

      if (!nextSemesterId) {
        toast.error("Next semester not found. Please contact administration.");
        return;
      }

      // Update student's admission semester to next semester
      const updateData = {
        admissionSemester: nextSemesterId,
      };

      console.log("student", student?.data?._id);
      const studentId = student?.data?._id;

      await updateOwnProfile({
        id: studentId || "",
        body: updateData,
      }).unwrap();

      console.log("Registration data:", {
        courseId: selectedCourse?.course._id,
        nextSemesterId,
        ...registrationData,
      });

      toast.success(
        "Registration submitted successfully! Your admission semester has been updated."
      );
      setIsModalOpen(false);
      setRegistrationData({
        preferredSubjects: "",
        academicGoals: "",
        additionalNotes: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
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
                      disabled={updateLoading}
                    >
                      {updateLoading
                        ? "Processing..."
                        : "Register Next Semester"}
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
          {coursesLoading ? (
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
              <p className="mt-2 text-sm text-blue-600">
                Your admission semester will be updated to the next semester
                upon successful registration.
              </p>
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
              disabled={updateLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleRegistrationSubmit}
              disabled={updateLoading}
            >
              {updateLoading ? "Submitting..." : "Submit Registration"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
