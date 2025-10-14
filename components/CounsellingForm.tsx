"use client";

import { useState } from "react";

type Props = { onSuccess?: () => void };

export default function CounsellingForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
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
      await new Promise((r) => setTimeout(r, 600));
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
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

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          aria-busy={submitting}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, id, type = "text", value, onChange, error, required, autoComplete,
}: any) {
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
  label, id, value, onChange, error, placeholder, className = "",
}: any) {
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