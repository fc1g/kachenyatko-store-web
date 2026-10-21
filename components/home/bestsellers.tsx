import { ProductCard } from "@/components/product-card";
import { mockToys } from "@/lib/api/mock";
import type { BrandColor } from "@/lib/brand-colors";

const colors: BrandColor[] = ["yellow", "pink", "blue"];

export function Bestsellers() {
  const toys = mockToys(3);

  return (
    <section id="bestsellers" className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-12">
        <h2 className="text-center text-[2.5rem]/tight font-bold">Bestsellers</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {toys.map((toy, i) => (
            <ProductCard key={toy.id} toy={toy} color={colors[i % colors.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
