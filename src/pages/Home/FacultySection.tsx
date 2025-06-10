import FacultyCard from "@/components/cards/FacultyCard";

const facultyData = [
  {
    name: "Jennifer Aarons, PhD",
    title: "Assistant Professor",
    email: "jenni@Unipixuni.edu",
    phone: "+1 2245 1247 241",
    department: "Hospitality, Tourism, Event Management and Esports",
    image: "https://i.postimg.cc/cHf3Yv1F/profile-picture.jpg",
  },
  {
    name: "Barry Palatnik, Ed.D",
    title: "Associate Professor of History",
    email: "jenni@Unipixuni.edu",
    phone: "+1 2245 1247 241",
    department: "Hospitality, Tourism, Event Management and Esports",
    image:
      "https://i.postimg.cc/ncp44GDB/closeup-portrait-caucasian-happy-teacher-glasses-74855-9736.avif",
  },
  {
    name: "Marc Robinson, MBA",
    title: "Teaching Specialist of Accounting",
    email: "jenni@Unipixuni.edu",
    phone: "+1 2245 1247 241",
    department: "Hospitality, Tourism, Event Management and Esports",
    image: "https://i.postimg.cc/HkPbCGP9/images.jpg",
  },
  {
    name: "Jennifer Aarons, PhD",
    title: "Assistant Professor",
    email: "jenni@Unipixuni.edu",
    phone: "+1 2245 1247 241",
    department: "Hospitality, Tourism, Event Management and Esports",
    image: "https://i.postimg.cc/VNGGTHXx/t20-5.jpg",
  },
];

const FacultySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Faculty & Staff Directory</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {facultyData.map((faculty, index) => (
          <FacultyCard key={index} {...faculty} />
        ))}
      </div>
    </section>
  );
};

export default FacultySection;
