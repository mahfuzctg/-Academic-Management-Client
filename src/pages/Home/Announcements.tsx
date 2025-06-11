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
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Latest Announcements
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="h-full rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <Badge
                  variant={typeToVariant(announcement.type)}
                  className="text-xs px-3 py-1"
                >
                  {announcement.type.charAt(0).toUpperCase() +
                    announcement.type.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {announcement.date}
                </span>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
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
