"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import CounsellingForm from "./CounsellingForm";

export default function HomeClient() {
  const [open, setOpen] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-white text-gray-900">
      {/* Landing content */}
      <section className="text-center space-y-5">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to DataPlay</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Streamline your counselling lead intake process with ease.
        </p>

        {/* SINGLE button here */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl px-6 py-3 text-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition"
        >
          Book Counselling
        </button>
      </section>

      {/* Modal */}
      <Modal
        id="counselling-modal"
        title="Book a Counselling Session"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CounsellingForm onSuccess={() => setOpen(false)} />
      </Modal>
    </main>
  );
}