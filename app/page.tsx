import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import WorkshopGallery from "@/components/WorkshopGallery";
import WhoCanApply from "@/components/WhoCanApply";
import Mentors from "@/components/Mentors";
import Courses from "@/components/Courses";
import CourseSectionPro from "@/components/CourseSectionPro";
import Features from "@/components/Features";
import FellowshipPrograms from "@/components/FellowshipPrograms";
import SocialBadge from "@/components/SocialBadge";
import CounsellingForm from "@/components/counelling_form";

export default function Home() {
  return (
    <>
      <SocialBadge />
      <HeroSection />
      {/* <Features /> */}
      {/* <CounsellingForm /> */}
      <FellowshipPrograms />
      {/* <Courses /> */}
      <CourseSectionPro />
      <Mentors />
      <Testimonials />
      <WhoCanApply />
      {/* <Gallery /> */}
      <WorkshopGallery />

    </>
  );
}
