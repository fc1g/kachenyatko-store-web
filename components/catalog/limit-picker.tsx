'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CheckIcon } from 'lucide-react';

import { SlidersIcon } from '@/components/icons/sliders-icon';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuLinkItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { catalogHref, LIMIT_OPTIONS, parseLimit } from './catalog-params';

const LABEL = 'Toys per page';

export function LimitPicker() {
	const pathname = usePathname();
	const current = parseLimit(useSearchParams().get('limit'));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" size="icon-lg" aria-label={LABEL} />}
			>
				<SlidersIcon className="size-6" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{LABEL}</DropdownMenuLabel>
					{LIMIT_OPTIONS.map(limit => (
						<DropdownMenuLinkItem
							key={limit}
							closeOnClick
							render={<Link href={catalogHref(pathname, { limit })} />}
							aria-current={limit === current ? 'true' : undefined}
							className="justify-between px-3 py-2 text-base"
						>
							{limit}
							{limit === current && <CheckIcon />}
						</DropdownMenuLinkItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function LimitPickerSkeleton() {
	return (
		<Button variant="ghost" size="icon-lg" disabled aria-label={LABEL}>
			<SlidersIcon className="size-6" />
		</Button>
	);
}
