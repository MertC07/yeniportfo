import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
};

/**
 * Infinite CSS marquee. Content is duplicated once and translated
 * -50% in a loop; pauses under reduced motion via global override.
 */
export function Marquee({ items, className, itemClassName }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "flex items-center whitespace-nowrap px-6 sm:px-10",
            itemClassName
          )}
        >
          {item}
          <span
            aria-hidden
            className="ml-12 size-1.5 rounded-full bg-accent sm:ml-20"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div className="flex animate-marquee will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
