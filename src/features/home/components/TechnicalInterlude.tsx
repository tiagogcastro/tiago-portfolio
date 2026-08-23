import Image from "next/image";

type TechnicalInterludeProps = {
  title: string;
  caption: string;
  image: string;
  items: readonly string[];
};

export function TechnicalInterlude({
  title,
  caption,
  image,
  items,
}: TechnicalInterludeProps) {
  return (
    <figure className="bg-surface-soft relative overflow-hidden border border-white/15 p-7 sm:p-10">
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1536px) 100vw, 1440px"
        className="pointer-events-none object-cover"
      />
      <figcaption className="relative">
        <p className="font-display max-w-2xl text-3xl leading-tight font-semibold sm:text-4xl">
          {title}
        </p>
        <p className="text-secondary mt-4 max-w-[62ch] leading-7">{caption}</p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <li
              key={item}
              className="bg-background/90 border-accent border-l-2 px-4 py-3 font-semibold"
            >
              {item}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
