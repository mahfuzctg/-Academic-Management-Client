import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import SemesterBlogSection from "../blogs/SemesterBlogPage";
import OfferedCourseSection from "../offerCourses/OfferedCourseSection";
import Announcements from "./Announcements";
import BlogBoard from "./BlogBoard";
import Contact from "./Contact";
import FacultySection from "./FacultySection";
import Features from "./Features";
import Hero from "./Hero";
import JobBoard from "./JobBoard";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";

export default function Home() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="min-h-screen flex flex-col ">
      <Hero />
      <main className="flex-grow  w-9/12 mx-auto">
        {user && user.role === "student" && <OfferedCourseSection />}

        <Announcements />
        <JobBoard />
        <FacultySection />

        <BlogBoard />
        <SemesterBlogSection />
        <Testimonials />
        <Features />
        <Statistics />
        <Contact />
      </main>
    </div>
  );
}
