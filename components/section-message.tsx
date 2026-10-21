import type { ReactNode } from 'react';

export function SectionMessage({ children }: { children: ReactNode }) {
	return (
		<p className="col-span-full py-8 text-center text-lg text-muted-foreground">
			{children}
		</p>
	);
}
