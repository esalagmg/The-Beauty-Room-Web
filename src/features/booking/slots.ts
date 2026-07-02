/** Bookable start times (Sri Lanka local), shared by the calendar UI and the
 *  server-side availability check. Plain module so it's safe on both sides. */
export const TIME_SLOTS = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
  "18:30",
] as const;

export const SL_OFFSET = "+05:30"; // Sri Lanka, no DST
