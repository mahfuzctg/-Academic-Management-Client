import SectionHeader from "@/components/resuable/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const announcements = [
  {
    id: 1,
    title: "Spring 2025 Enrollment Now Open",
    date: "2024-03-15",
    type: "enrollment",
  },
  {
    id: 2,
    title: "Assignment Deadlines Updated",
    date: "2024-03-14",
    type: "academic",
  },
  {
    id: 3,
    title: "New Freelance Opportunities Available",
    date: "2024-03-13",
    type: "job",
  },
  {
    id: 4,
    title: "Midterm Exam Schedule Released",
    date: "2024-03-12",
    type: "academic",
  },
  {
    id: 5,
    title: "Campus Hiring Drive This April",
    date: "2024-03-11",
    type: "job",
  },
  {
    id: 6,
    title: "Course Registration Deadline Approaching",
    date: "2024-03-10",
    type: "enrollment",
  },
  {
    id: 7,
    title: "Portfolio Submission Guidelines Updated",
    date: "2024-03-09",
    type: "academic",
  },
  {
    id: 8,
    title: "Freelance Platform Launching Soon",
    date: "2024-03-08",
    type: "job",
  },
];

const typeToVariant = (type: string) => {
  switch (type) {
    case "enrollment":
      return "default";
    case "academic":
      return "secondary";
    case "job":
      return "outline";
    default:
      return "default";
  }
};

const Announcements = () => {
  return (
    <section className="py-20  dark:bg-[#020817] transition-colors duration-500">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Latest Announcements"
          subtitle="Stay updated with the most recent academic and career-related information"
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="h-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.015]"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <Badge
                  variant={typeToVariant(announcement.type)}
                  className="text-xs px-3 py-1 capitalize"
                >
                  {announcement.type}
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {announcement.date}
                </span>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base font-medium text-gray-800 dark:text-white leading-snug">
                  {announcement.title}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
