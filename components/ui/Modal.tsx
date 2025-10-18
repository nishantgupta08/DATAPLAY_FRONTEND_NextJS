"use client";
import React, { memo } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = memo(function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="counselling-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl outline-none">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="counselling-title" className="sr-only">
          Book a Counselling Session
        </h2>
        {children}
      </div>
    </div>
  );
});

export default Modal;
