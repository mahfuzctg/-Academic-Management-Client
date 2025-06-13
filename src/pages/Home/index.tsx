import OfferedCourseSection from "../offerCourses/OfferedCourseSection";
import Announcements from "./Announcements";
import Contact from "./Contact";
import FacultySection from "./FacultySection";
import Features from "./Features";
import Hero from "./Hero";
import JobBoard from "./JobBoard";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <OfferedCourseSection />
        <FacultySection />

        <Features />
        <Announcements />
        <JobBoard />
        <Testimonials />
        <Statistics />
        <Contact />
      </main>
    </div>
  );
}
