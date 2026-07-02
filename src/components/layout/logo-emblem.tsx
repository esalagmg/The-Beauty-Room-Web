import Image from "next/image";
import Link from "next/link";
import { brand } from "@/constants/images";
import { cn } from "@/lib/utils";

/**
 * The circular gold brand emblem (transparent PNG). Sized via `className` on the
 * square wrapper (e.g. "h-11 w-11"). Wrap in a home link unless `href` is null.
 */
export function LogoEmblem({
  className,
  href = "/",
  priority = false,
  sizes = "112px",
}: {
  className?: string;
  href?: string | null;
  priority?: boolean;
  sizes?: string;
}) {
  const inner = (
    <span className={cn("relative block aspect-square", className)}>
      <Image
        src={brand.emblem}
        alt="The Beauty Room by Nilu"
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
      />
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="The Beauty Room by Nilu, home" className="inline-block">
      {inner}
    </Link>
  );
}
