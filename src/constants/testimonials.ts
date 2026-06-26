import type { Testimonial } from "@/types";
import { brand, img } from "./images";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Tharushi M.",
    service: "Signature Bridal Look",
    location: "Ratnapura",
    rating: 5,
    quote:
      "I have never felt more myself than on my wedding day. Nilu didn't just do my makeup; she understood exactly who I wanted to be.",
    image: brand.bridalRoses,
  },
  {
    id: "t2",
    name: "Dilini R.",
    service: "Dimensional Colour",
    location: "Pelmadulla",
    rating: 5,
    quote:
      "The colour is unreal. It catches the light differently in every room, and six weeks later it still looks freshly done. Pure artistry.",
    image: img.salonColor,
  },
  {
    id: "t3",
    name: "Sanjana P.",
    service: "HydraGlow Facial",
    location: "Kuruwita",
    rating: 5,
    quote:
      "The clinic feels like a five-star spa but with real science behind it. My skin has never been this clear and luminous.",
    image: img.clinicSkin,
    isVideo: true,
  },
  {
    id: "t4",
    name: "Hashini W.",
    service: "Collagen Microneedling",
    location: "Balangoda",
    rating: 5,
    quote:
      "Nilu explained everything with such care. The results on my acne scars are genuinely life-changing. Worth every rupee.",
    image: img.clinicTreatment,
  },
  {
    id: "t5",
    name: "Amaya S.",
    service: "Signature Cut & Finish",
    location: "Eheliyagoda",
    rating: 5,
    quote:
      "From the welcome coffee to the final blow-dry, every detail feels intentional. It's the only place I trust with my hair now.",
    image: brand.hairSleek,
  },
  {
    id: "t6",
    name: "Nethmi J.",
    service: "Occasion Glam",
    location: "Embilipitiya",
    rating: 5,
    quote:
      "Elegant, warm and unbelievably talented. I walked out feeling like the most polished version of myself.",
    image: brand.bridalSaree,
    isVideo: true,
  },
];
