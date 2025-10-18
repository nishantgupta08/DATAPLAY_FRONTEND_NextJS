// Image utility functions
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmedUrl = url.trim();
  if (trimmedUrl === '') return false;
  
  // Check if it's a valid URL
  try {
    new URL(trimmedUrl);
    return true;
  } catch {
    return false;
  }
}

export function getImageFallback(type: 'workshop' | 'testimonial' | 'course' = 'workshop'): string {
  const fallbacks = {
    workshop: 'https://res.cloudinary.com/dd0e4iwau/image/upload/v1759416375/IMG_20250827_132209_kiyjyr.jpg',
    testimonial: 'https://res.cloudinary.com/dd0e4iwau/image/upload/v1759417697/Screenshot_2025-10-02_203751_zjh5g5.png',
    course: 'https://res.cloudinary.com/dd0e4iwau/image/upload/v1759480655/Group_217_youx1q.png'
  };
  
  return fallbacks[type];
}

export function getSafeImageUrl(url: string | null | undefined, fallbackType: 'workshop' | 'testimonial' | 'course' = 'workshop'): string {
  return isValidImageUrl(url) ? url! : getImageFallback(fallbackType);
}
