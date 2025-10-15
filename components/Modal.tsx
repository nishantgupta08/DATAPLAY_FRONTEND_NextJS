"use client";

type ModalProps = {
  id?: string;
  title?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ id, title, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${id}-title` : undefined}
      className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl outline-none border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 id={`${id}-title`} className="text-lg font-semibold">
            {title ?? "Modal"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-gray-600 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}