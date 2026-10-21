import { About } from '@/components/home/about';
import { Bestsellers } from '@/components/home/bestsellers';
import { CustomOrder } from '@/components/home/custom-order';
import { Hero } from '@/components/home/hero';
import { NewArrivals } from '@/components/home/new-arrivals';

export default function Home() {
	return (
		<>
			<Hero />
			<Bestsellers />
			<About />
			<NewArrivals />
			<CustomOrder />
		</>
	);
}
