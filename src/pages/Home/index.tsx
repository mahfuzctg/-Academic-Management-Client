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
  return (
    <div className="min-h-screen flex flex-col ">
      <Hero />
      <main className="flex-grow  w-9/12 mx-auto">
        <OfferedCourseSection />
        <Features />
        <FacultySection />
        <Announcements />
        <JobBoard />
        <BlogBoard />
        <Testimonials />
        <Statistics />
        <Contact />
      </main>
    </div>
  );
}
