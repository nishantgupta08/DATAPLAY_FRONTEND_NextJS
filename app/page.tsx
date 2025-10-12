import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import WhoCanApply from "@/components/WhoCanApply";
import Mentors from "@/components/Mentors";
import Courses from "@/components/Courses";
import Features from "@/components/Features";
import FellowshipPrograms from "@/components/FellowshipPrograms";
import SocialBadge from "@/components/SocialBadge";

export default function Home() {
  return (
    <>
      <SocialBadge />
      <HeroSection />
      <Features />
      <FellowshipPrograms />
      <Courses />
      <PrimaryCTASection />
      <Mentors />
      <BecomeMentorInlineForm />
      <StickyCTA />
      <Testimonials />
      <WhoCanApply />
      <Gallery />
    </>
  );
}
