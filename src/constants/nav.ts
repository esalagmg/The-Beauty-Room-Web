export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Salon", href: "/salon" },
  { label: "Clinic", href: "/clinic" },
  { label: "Services", href: "/#services" },
  { label: "Specialists", href: "/#specialists" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export const footerColumns = [
  {
    title: "Experiences",
    links: [
      { label: "The Salon", href: "/salon" },
      { label: "Aesthetic Clinic", href: "/clinic" },
      { label: "Bridal & Couture", href: "/#services" },
      { label: "Gift Cards", href: "/#contact" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Book Appointment", href: "/booking" },
      { label: "Our Specialists", href: "/#specialists" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];
