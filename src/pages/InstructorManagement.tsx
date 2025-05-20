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

interface Instructor {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  subjects: string[];
}

export default function InstructorManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [instructors] = useState<Instructor[]>([
    {
      id: "1",
      name: "Dr. Jane Smith",
      email: "jane@example.com",
      department: "Computer Science",
      designation: "Associate Professor",
      subjects: ["Data Structures", "Algorithms"],
    },
    // Add more sample data as needed
  ]);

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Instructor Management</h1>
        <Button
          onClick={() => {
            toast({
              title: "Coming soon",
              description:
                "Instructor registration feature will be available soon.",
            });
          }}
        >
          Add New Instructor
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search instructors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell>{instructor.department}</TableCell>
                <TableCell>{instructor.designation}</TableCell>
                <TableCell>{instructor.subjects.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      toast({
                        title: "Coming soon",
                        description:
                          "Instructor profile editing will be available soon.",
                      });
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
