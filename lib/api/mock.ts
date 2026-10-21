import type { Toy } from "./types";

// TODO: remove once the home page sections fetch real toys
export function mockToys(count: number): Pick<Toy, "id" | "name" | "description" | "images">[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i}`,
    name: "Product name product name",
    description:
      "Short product description short product description short product description short product description short product description",
    images: [],
  }));
}
