'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from 'cn';

export function ToyDescription({ children }: { children: string }) {
	const ref = useRef<HTMLParagraphElement>(null);
	const [expanded, setExpanded] = useState(false);
	const [clamped, setClamped] = useState(false);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const check = () => setClamped(el.scrollHeight > el.clientHeight);
		check();

		const observer = new ResizeObserver(check);
		observer.observe(el);
		return () => observer.disconnect();
	}, [children]);

	return (
		<div className="flex flex-col items-start gap-4">
			<p ref={ref} className={cn('text-lg', !expanded && 'line-clamp-3')}>
				{children}
			</p>

			{(clamped || expanded) && (
				<button
					type="button"
					onClick={() => setExpanded(!expanded)}
					className="text-sm text-blue-600 underline underline-offset-2 hover:no-underline"
				>
					{expanded ? 'Less' : 'More'}
				</button>
			)}
		</div>
	);
}
