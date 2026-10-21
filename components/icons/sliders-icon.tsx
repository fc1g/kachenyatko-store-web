import type { SVGProps } from 'react';

export function SlidersIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M21 4H14" />
			<path d="M10 4H3" />
			<path d="M21 12H12" />
			<path d="M8 12H3" />
			<path d="M21 20H16" />
			<path d="M12 20H3" />
			<path d="M14 2V6" />
			<path d="M8 10V14" />
			<path d="M16 18V22" />
		</svg>
	);
}
