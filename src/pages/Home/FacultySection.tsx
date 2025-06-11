import FacultyCard from "@/components/cards/FacultyCard";

const facultyData = [
  {
    name: "Dr. Ayesha Rahman",
    title: "Professor, Artificial Intelligence",
    email: "ayesha.rahman@unipixuni.edu",
    phone: "+1 321 456 7890",
    department: "Computer Science and Engineering",
    image: "https://i.postimg.cc/cHf3Yv1F/profile-picture.jpg",
  },
  {
    name: "Dr. Tanvir Islam",
    title: "Associate Professor, Cybersecurity",
    email: "tanvir.islam@unipixuni.edu",
    phone: "+1 312 654 3210",
    department: "Computer Science and Engineering",
    image:
      "https://i.postimg.cc/ncp44GDB/closeup-portrait-caucasian-happy-teacher-glasses-74855-9736.avif",
  },
  {
    name: "Dr. Mehedi Hasan",
    title: "Assistant Professor, Data Science",
    email: "mehedi.hasan@unipixuni.edu",
    phone: "+1 213 987 6543",
    department: "Computer Science and Engineering",
    image: "https://i.postimg.cc/HkPbCGP9/images.jpg",
  },
  {
    name: "Dr. Farzana Kabir",
    title: "Lecturer, Software Engineering",
    email: "farzana.kabir@unipixuni.edu",
    phone: "+1 202 888 1122",
    department: "Computer Science and Engineering",
    image: "https://i.postimg.cc/VNGGTHXx/t20-5.jpg",
  },
];

const FacultySection = () => {
  return (
    <section className="w-9/12 mx-auto px-4 py-12">
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
