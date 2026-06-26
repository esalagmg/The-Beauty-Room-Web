export type Division = "salon" | "clinic";

export interface ServiceCategory {
  id: string;
  division: Division;
  name: string;
  tagline: string;
  description: string;
  image: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  highlight?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  division: Division | "both";
  experience: string;
  bio: string;
  expertise: string[];
  image: string;
  instagram?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  quote: string;
  rating: number;
  image?: string;
  location?: string;
  isVideo?: boolean;
}

export interface GalleryItem {
  id: string;
  category: string;
  division: Division;
  title: string;
  before: string;
  after: string;
}

export interface InteriorSpace {
  id: string;
  name: string;
  description: string;
  image: string;
}

/* ── Booking flow ─────────────────────────────────────────────── */
export interface BookingState {
  division: Division | null;
  categoryId: string | null;
  serviceId: string | null;
  specialistId: string | null;
  date: string | null;
  time: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export type BookingStepId =
  | "division"
  | "category"
  | "service"
  | "specialist"
  | "date"
  | "info"
  | "confirm";
