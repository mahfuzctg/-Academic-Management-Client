import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  grade: string;
  marks: number;
  batch?: string;
}

export default function AcademicPerformance() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: "1",
      studentId: "S001",
      studentName: "John Doe",
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      grade: "A",
      marks: 85,
      batch: "CSE 19th Batch",
    },
    // Add more sample data as needed
  ]);

  const filteredGrades = grades.filter(
    (grade) =>
      (grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grade.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grade.courseName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedBatch || grade.batch === selectedBatch)
  );

  const handleGradeUpdate = (gradeId: string, newMarks: number) => {
    const getGrade = (marks: number): string => {
      if (marks >= 90) return "A+";
      if (marks >= 80) return "A";
      if (marks >= 70) return "B";
      if (marks >= 60) return "C";
      if (marks >= 50) return "D";
      return "F";
    };

    setGrades((prevGrades) =>
      prevGrades.map((grade) =>
        grade.id === gradeId
          ? {
              ...grade,
              marks: newMarks,
              grade: getGrade(newMarks),
            }
          : grade
      )
    );

    toast({
      title: "Grade Updated",
      description: "The student's grade has been updated successfully.",
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredGrades.map(({ id, ...rest }) => rest)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `grades_${selectedBatch || "all"}_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename);

    toast({
      title: "Export Successful",
      description: `Grades have been exported to ${filename}`,
    });
  };

  const batches = Array.from(
    new Set(grades.map((grade) => grade.batch))
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Academic Performance</h1>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border rounded-md"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">All Batches</option>
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
          <Button onClick={exportToExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by student or course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.studentId}</TableCell>
                <TableCell>{grade.studentName}</TableCell>
                <TableCell>{grade.courseCode}</TableCell>
                <TableCell>{grade.courseName}</TableCell>
                <TableCell>{grade.batch}</TableCell>
                <TableCell>{grade.marks}</TableCell>
                <TableCell>{grade.grade}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={grade.marks}
                    className="w-20"
                    onChange={(e) => {
                      const newMarks = parseInt(e.target.value);
                      if (
                        !isNaN(newMarks) &&
                        newMarks >= 0 &&
                        newMarks <= 100
                      ) {
                        handleGradeUpdate(grade.id, newMarks);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
