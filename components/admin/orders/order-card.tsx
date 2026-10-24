import Image from 'next/image';
import Link from 'next/link';

import { SubmitButton } from '@/components/admin/submit-button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Order, Toy } from '@/lib/api/types';

import { setOrderStatus } from './actions';

const dateFormat = new Intl.DateTimeFormat('en-GB', {
	dateStyle: 'medium',
	timeStyle: 'short',
	timeZone: 'Europe/Kyiv',
});

type OrderCardProps = {
	order: Order;
	toy: Toy | null;
};

export function OrderCard({ order, toy }: OrderCardProps) {
	const closed = order.status === 'closed';

	return (
		<article className="flex flex-col gap-4 rounded-lg border p-5">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<OrderToy order={order} toy={toy} />
				<time
					dateTime={order.created_at}
					className="text-sm text-muted-foreground"
				>
					{dateFormat.format(new Date(order.created_at))}
				</time>
			</div>

			<a
				href={`tel:${order.phone}`}
				className="self-start text-lg font-medium underline-offset-4 hover:underline"
			>
				{order.phone}
			</a>

			{order.details && <OrderText label="Description" text={order.details} />}
			{order.message && <OrderText label="Comment" text={order.message} />}

			<form
				action={setOrderStatus.bind(null, order.id, closed ? 'open' : 'closed')}
				className="self-end"
			>
				<SubmitButton variant={closed ? 'outline' : 'default'} size="lg">
					{closed ? 'Reopen' : 'Mark as done'}
				</SubmitButton>
			</form>
		</article>
	);
}

function OrderToy({ order, toy }: OrderCardProps) {
	if (!order.toy_id) {
		return (
			<span className="rounded-md bg-yellow px-2 py-1 text-sm font-semibold text-black">
				Custom
			</span>
		);
	}

	if (!toy) {
		return <span className="text-muted-foreground">Toy removed</span>;
	}

	const image = toy.images.at(0);

	return (
		<Link
			href={`/toys/${toy.id}`}
			target="_blank"
			className="flex items-center gap-3 hover:underline"
		>
			<span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
				{image && (
					<Image
						src={image.url}
						alt=""
						fill
						sizes="56px"
						className="object-cover"
					/>
				)}
			</span>
			<span className="font-semibold">{toy.name}</span>
		</Link>
	);
}

function OrderText({ label, text }: { label: string; text: string }) {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="whitespace-pre-line">{text}</p>
		</div>
	);
}

export function OrderCardSkeleton() {
	return (
		<div
			aria-hidden="true"
			className="flex flex-col gap-4 rounded-lg border p-5"
		>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<Skeleton className="size-14 rounded-md" />
					<Skeleton className="h-5 w-40" />
				</div>
				<Skeleton className="h-4 w-32" />
			</div>
			<Skeleton className="h-6 w-44" />
			<Skeleton className="h-5" />
			<Skeleton className="h-9 w-32 self-end" />
		</div>
	);
}
