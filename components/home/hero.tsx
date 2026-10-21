import Link from "next/link";

import { DecorativeShape } from "@/components/decorative-shape";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-x-clip py-20 md:py-32 lg:py-40">
      <DecorativeShape
        color="yellow"
        className="-top-14 left-[28%] h-24 w-36 md:-top-16 md:left-[15%] md:h-36 md:w-44"
      />
      <DecorativeShape
        color="blue"
        className="-bottom-12 -left-16 h-28 w-24 lg:bottom-6 lg:-left-20 lg:h-60 lg:w-48"
      />
      <DecorativeShape
        color="pink"
        className="top-14 right-[-22%] aspect-4/5 w-[55%] rotate-[-18deg] md:right-[-14%] md:w-[38%] lg:top-[4%] lg:right-[-6%] lg:aspect-10/11 lg:w-[34%] lg:max-w-xl"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-12">
        <div>
          <h1 className="text-[1.625rem]/[1.4] font-extrabold md:text-[3.5rem]/[1.4] lg:text-[4.25rem]/[1.4]">
            The softest toys for <br />
            the most tender cuddles
          </h1>
          <p className="mt-4 max-w-2xl text-lg/[1.4] md:mt-6 md:text-2xl/[1.4] lg:text-[2rem]/[1.4]">
            Hypoallergenic, pleasant to touch and safe for children.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/catalog" />}
            className="mt-8 h-12 px-6 text-lg md:mt-10"
          >
            To the store
          </Button>
        </div>
      </div>
    </section>
  );
}
