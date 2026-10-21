import { Flower2 } from "lucide-react";

import { CatIcon } from "@/components/icons/cat-icon";
import { SproutIcon } from "@/components/icons/sprout-icon";

const resources = [
  {
    Icon: SproutIcon,
    text: "Only premium and secure materials that guarantee softness, durability, and enjoyable tactile sensations are used in our knitted toys. Soft and silky, plush yarn is ideal for snuggling. The greatest option for ornamental goods and toys for kids.",
  },
  {
    Icon: Flower2,
    text: "Acrylic yarn comes in a range of colors and is lightweight and sturdy. Excellent for developing colorful and fashionable characters. Cotton yarn is eco-friendly, hypoallergenic, and natural. Perfect for people who appreciate natural materials.",
  },
  {
    Icon: CatIcon,
    text: "The sort of toy and your personal tastes will determine the material choice. We would be pleased to choose the best choice for you if you have any particular needs!",
  },
];

export function About() {
  return (
    <section id="about" className="bg-yellow/50 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-12">
        <h2 className="text-[2.5rem] leading-6 font-bold">Resources</h2>

        <ul className="mt-10 flex flex-col gap-8 md:gap-10">
          {resources.map(({ Icon, text }) => (
            <li key={text} className="flex items-start gap-5 md:items-center md:gap-6">
              <Icon
                strokeWidth={4}
                className="size-12 shrink-0 md:size-16 **:[vector-effect:non-scaling-stroke]"
              />
              <p className="text-lg/[1.4] font-medium">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
