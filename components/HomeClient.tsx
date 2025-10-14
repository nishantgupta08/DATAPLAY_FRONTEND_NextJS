// components/HomeClient.tsx
"use client";

import { useState } from "react";
import CounsellingForm from "@/components/CounsellingForm";

export default function HomeClient() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen px-6 py-10 flex items-start justify-center bg-white text-gray-900">
      <div className="w-full max-w-3xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">DataPlay</h1>
          <p className="text-sm text-gray-500">
            Capture counselling leads and preferences. All fields validate on submit.
          </p>
        </header>

        {!submitted ? (
          <CounsellingForm onSuccess={() => setSubmitted(true)} />
        ) : (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">Thanks! 🎉</h2>
            <p className="mt-1 text-gray-600">
              Your details have been received. We’ll reach out shortly.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}