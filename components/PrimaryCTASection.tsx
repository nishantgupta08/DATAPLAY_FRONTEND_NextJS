import React from "react";
import Link from "next/link";

export default function PrimaryCTASection() {
  return (
    <section className="container my-16">
      <div className="rounded-2xl bg-[#F5F5F5] border-2 border-black p-8 shadow-[8px_8px_0_#000]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-black">Level up with a Mentor</h3>
            <p className="text-black/70 mt-2">Personalized guidance for your next role, project, or career jump.</p>
          </div>
          <div className="flex gap-3">
            <Link href="#become-mentor" className="inline-flex items-center justify-center px-5 py-3 rounded-full font-bold bg-black text-white border-2 border-black hover:translate-y-[-1px] active:translate-y-[1px] transition-transform">
              Become a mentor
            </Link>
            <Link href="#courses" className="inline-flex items-center justify-center px-5 py-3 rounded-full font-bold bg-white text-black border-2 border-black hover:translate-y-[-1px] active:translate-y-[1px] transition-transform">
              Explore courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}