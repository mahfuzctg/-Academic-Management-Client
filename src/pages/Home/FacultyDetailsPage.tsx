import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FacultyDetailsPage = () => {
  const faculty = {
    name: "Arif Istiaq Rupom",
    title: "Professor & Head of CSE",
    banner: "https://i.postimg.cc/SNsFQb2F/campus-img-2.png",
    profile:
      "https://i.postimg.cc/Kc5xv50L/1de67411-7aab-470d-995c-5373bd6206a8.jpg",
    email: "arif.faculty@uni.edu",
    phone: "+880123456789",
    academicDepartment: "Computer Science & Engineering",
    academicFaculty: "Faculty of Engineering",
    about: `A highly accomplished academic professional with a strong commitment to excellence in teaching, research, and academic leadership. With over a decade of experience in higher education, this individual has made significant contributions to curriculum development, faculty mentoring, and student success.

Specialized in areas such as artificial intelligence, software engineering, and cybersecurity, their work consistently bridges theoretical foundations with real-world applications. Numerous research papers have been published in reputed international journals and conferences under their guidance.

Known for fostering a collaborative and inclusive learning environment, this educator encourages innovation, critical thinking, and ethical practices among students. They actively participate in academic exchange programs, national seminars, and technology festivals, contributing to both institutional growth and student development.

A visionary leader with a deep sense of responsibility, always working towards shaping the next generation of tech professionals who are globally competent and socially responsible.`,
  };

  return (
    <div className="max-w-6xl mx-auto bg-background  rounded-xl overflow-hidden ">
      {/* Banner Section */}
      <div className="relative">
        <img
          src={faculty.banner}
          alt="Faculty Banner"
          className="w-full h-64 object-cover"
        />
        <div className="absolute -bottom-16 left-8">
          <img
            src={faculty.profile}
            alt="Faculty Profile"
            className="w-32 h-32 rounded-full border-4 border-background shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="pt-20 px-6 md:px-10 pb-12 space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {faculty.name}
            </h1>
            <Badge className="mt-2">{faculty.title}</Badge>
          </div>

          <div className="text-sm text-muted-foreground space-y-1 text-right">
            <div>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              <a
                href={`mailto:${faculty.email}`}
                className="text-blue-600 underline"
              >
                {faculty.email}
              </a>
            </div>
            <div>
              <span className="font-semibold text-foreground">Phone:</span>{" "}
              <a
                href={`tel:${faculty.phone}`}
                className="text-blue-600 underline"
              >
                {faculty.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <div>
            <h2 className="text-lg font-medium text-foreground mb-1">
              Academic Department
            </h2>
            <p className="text-muted-foreground">
              {faculty.academicDepartment}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-foreground mb-1">
              Academic Faculty
            </h2>
            <p className="text-muted-foreground">{faculty.academicFaculty}</p>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-foreground">About</h2>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {faculty.about}
          </p>
        </div>

        {/* Back Button */}
        <div className="pt-6">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full sm:w-1/3"
          >
            Back to List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailsPage;
