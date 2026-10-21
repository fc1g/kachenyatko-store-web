import { cn } from 'cn';

import { brandBgClasses, type BrandColor } from '@/lib/brand-colors';

type DecorativeShapeProps = {
	color: BrandColor;
	className?: string;
};

export function DecorativeShape({ color, className }: DecorativeShapeProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute -z-10 rounded-[2rem]',
				brandBgClasses[color],
				className,
			)}
		/>
	);
}
