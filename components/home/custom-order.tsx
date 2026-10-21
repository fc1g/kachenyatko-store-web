import { Dog } from "lucide-react";

export function CustomOrder() {
  return (
    <section id="custom-order" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-12">
        <div className="flex items-center gap-4 md:gap-6">
          <Dog className="size-12 shrink-0" />
          <h2 className="text-[2.5rem]/tight font-bold">Custom orders</h2>
        </div>

        <div className="mt-8 flex flex-col gap-6 text-lg/[1.4] font-medium">
          <p>
            We will manufacture a toy based on your specifications if you order one with a bespoke
            design. The manufacturing time is determined individually and is contingent upon the
            intricacy of the work.
          </p>
          <p>
            Throughout the entire process, we will stay in close contact with you to make sure
            every detail is taken into account and the toy is made precisely how you have
            envisioned it. We will dispatch it as soon as it is prepared.
          </p>
        </div>
      </div>
    </section>
  );
}
