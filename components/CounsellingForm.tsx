// components/CounsellingForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = { onSuccess?: () => void };

export default function CounsellingForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [key]: e.target.value }));

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!/^\+?[0-9\s\-()]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone.";
    if (form.notes.length > 500) e.notes = "Keep notes under 500 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: replace with your actual submit (fetch/axios). This is a stub.
      await new Promise((r) => setTimeout(r, 600));
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      role="form"
      aria-labelledby="counselling-title"
    >
      <h2 id="counselling-title" className="text-lg font-semibold">
        Counselling Intake
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Name"
          id="name"
          value={form.name}
          onChange={onChange("name")}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={form.email}
          onChange={onChange("email")}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          value={form.phone}
          onChange={onChange("phone")}
          error={errors.phone}
          autoComplete="tel"
          required
        />
        <TextArea
          className="md:col-span-2"
          label="Notes"
          id="notes"
          value={form.notes}
          onChange={onChange("notes")}
          error={errors.notes}
          placeholder="Tell us a bit about what you’re looking for…"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        aria-busy={submitting}
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </motion.form>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  required,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  className = "",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full min-h-[120px] rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}