"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import CounsellingForm from "./CounsellingForm";

/**
 * ModalHost mounts once and:
 * - Opens the modal when any element with [data-counselling-open] is clicked
 * - Blurs/dims the background and locks body scroll while open
 * - Closes on ESC or backdrop click (backdrop handled in <Modal />)
 * - Also supports programmatic open: window.dispatchEvent(new CustomEvent("open-counselling"))
 */
export default function ModalHost() {
  const [open, setOpen] = useState(false);

  // Lock/unlock body scroll while modal is open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Listen for clicks on any [data-counselling-open] element
  useEffect(() => {
    const handleClick = (e: Event) => {
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        if (el.hasAttribute("data-counselling-open")) {
          e.preventDefault();
          setOpen(true);
          break;
        }
        el = el.parentElement;
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Optional: programmatic open via custom event
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-counselling", onOpen as EventListener);
    return () => window.removeEventListener("open-counselling", onOpen as EventListener);
  }, []);

  return (
    <Modal
      id="counselling-modal"
      title="Book a Counselling Session"
      open={open}
      onClose={() => setOpen(false)}
    >
      <CounsellingForm onSuccess={() => setOpen(false)} />
    </Modal>
  );
}