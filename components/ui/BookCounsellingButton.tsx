'use client';
import { Icon } from '@iconify/react';

type Props = { className?: string };

export default function BookCounsellingButton({ className = '' }: Props) {
  const open = () => {
    window.dispatchEvent(new CustomEvent('openCounsellingModal'));
  };

  return (
    <button
      type="button"
      onClick={open}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white px-6 py-3 font-bold hover:bg-darkBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${className}`}
      aria-label="Book Counselling Session"
    >
      <Icon icon="mdi:rocket-launch-outline" className="mr-2 text-xl" />
      Book Counselling Session
    </button>
  );
}