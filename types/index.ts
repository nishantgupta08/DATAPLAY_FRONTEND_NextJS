// Main types barrel export
export * from './api';
export * from './forms';

// Re-export all types from the original index for backward compatibility
export type EnrolledStudent = { 
  id: string; 
  institute: string; 
  program: string; 
  city?: string;
  pinCode?: string;
  postalCode?: string;
  coordinates?: [number, number]; // [lat, lng]
};

export interface Expert {
  name: string;
  role?: string;
  img?: string;
  linkedin?: string;
  description?: string;
}

export interface Partner {
  name: string;
  logo?: string;
}

export interface Module {
  title: string;
  submodules: Submodule[];
}

export interface Submodule {
  title: string;
  content: string[];
}

export interface Course {
  id: number;
  title: string;
  sub_title: string;
  img_url: string;
  duration_weeks?: number;
  next_cohort_date?: string;
  courses_content?: Module[];
  right_side_video_url?: string;
  user_section?: UserTestimonial[];
}

export interface UserTestimonial {
  img_url: string;
  name: string;
  linkdin_url: string;
  designation_name: string;
  company_name: string;
  company_business_link: string;
  details: string;
}

export interface Testimonial {
  name: string;
  designation: string;
  testimonial: string;
  image?: string;
  rating?: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

// Workshop types
export type LinkedInMeta = { 
  url?: string | null; 
  urn?: string | null; 
};

export type WorkshopItem = {
  college: string;
  city?: string | null;
  date: string; // ISO date
  cover: string; // /public path or remote
  attendees?: number | null;
  satisfaction?: number | null; // 0–100
  speakers?: string[] | null;
  linkedin?: LinkedInMeta | null;
};

// Person detail types
export type PersonDetail = {
  img: string;
  name: string;
  designation: string;
  linkdin_profile?: string;
};

export type Transformation = {
  old_designation: string;
  old_title: string;
  new_designation: string;
  new_title: string;
};

// Mentor raw shape for content.json
export interface MentorRaw {
  role: string | undefined;
  img?: string;
  name?: string;
  current_company?: string;
  description?: string;
  linkdin_profile?: string;
  full_name?: string;
  title?: string;
  designation?: string;
  designation_name?: string;
  company?: string;
  company_name?: string;
  details?: string;
  linkedin?: string;
  linkedin_url?: string;
  linkdin_url?: string;
  image?: string;
  photo?: string;
  avatar?: string;
  img_url?: string;
}