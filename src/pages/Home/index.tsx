import Hero from "./Hero";
import Features from "./Features";
import Announcements from "./Announcements";
import JobBoard from "./JobBoard";
import Testimonials from "./Testimonials";
import Statistics from "./Statistics";
import Contact from "./Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
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
