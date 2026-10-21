'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { InfoIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { createOrder } from './actions';
import { MESSAGE_MAX_LENGTH, type OrderFormState } from './order-params';

const PHONE_HINT = [
	'We only use your number to talk about this order: no spam, no ads, and we never share it with anyone. Expect a message from us within 24 hours.',
	"We'd be really grateful if this is your Telegram number. No Telegram? Just tell us in the field below which messenger works best for you.",
];

const initialState: OrderFormState = { status: 'idle' };

const messageField = {
	toy: {
		label: 'Order details',
		placeholder:
			"Color, size, a name to embroider, a deadline... anything you'd like us to know",
	},
	custom: {
		label: 'Describe your toy',
		placeholder:
			"Which animal or character, colors, size, who it's for... You can send reference photos later in the chat",
	},
};

export function OrderForm({ toyId }: { toyId?: string }) {
	const [state, formAction, pending] = useActionState(
		createOrder.bind(null, toyId ?? null),
		initialState,
	);
	const message = toyId ? messageField.toy : messageField.custom;

	if (state.status === 'success') {
		return (
			<div
				role="status"
				className="flex flex-col items-start gap-4 rounded-lg bg-green/20 p-6"
			>
				<h2 className="text-2xl font-semibold">Thank you for your order!</h2>
				<p className="text-lg">
					We&apos;ll message you within 24 hours to talk through the details.
				</p>
				<Button
					nativeButton={false}
					render={<Link href="/catalog" />}
					className="h-11 px-5 text-base"
				>
					Back to catalog
				</Button>
			</div>
		);
	}

	const error = state.status === 'error' ? state : null;

	return (
		<form action={formAction} className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-1.5">
					<Label htmlFor="phone" className="text-base">
						Phone number
					</Label>
					<Tooltip>
						<TooltipTrigger
							render={
								<button
									type="button"
									aria-label={PHONE_HINT.join(' ')}
									className="text-muted-foreground transition-colors hover:text-foreground"
								/>
							}
						>
							<InfoIcon className="size-4" />
						</TooltipTrigger>
						<TooltipContent className="max-w-sm flex-col items-start gap-2 px-4 py-3 text-sm">
							{PHONE_HINT.map(paragraph => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</TooltipContent>
					</Tooltip>
				</div>
				<Input
					id="phone"
					name="phone"
					type="tel"
					inputMode="tel"
					autoComplete="tel"
					required
					placeholder="+380 67 123 45 67"
					defaultValue={error?.values.phone}
					aria-invalid={error?.field === 'phone' || undefined}
					aria-describedby={
						error?.field === 'phone' ? 'order-error' : undefined
					}
					className="h-11 text-base md:text-base"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="message" className="text-base">
					{message.label}
				</Label>
				<Textarea
					id="message"
					name="message"
					required={!toyId}
					maxLength={MESSAGE_MAX_LENGTH}
					placeholder={message.placeholder}
					defaultValue={error?.values.message}
					aria-invalid={error?.field === 'message' || undefined}
					aria-describedby={
						error?.field === 'message' ? 'order-error' : undefined
					}
					className="min-h-32 text-base md:text-base"
				/>
			</div>

			{error && (
				<p id="order-error" role="alert" className="text-error">
					{error.error}
				</p>
			)}

			<Button
				type="submit"
				disabled={pending}
				className="h-12 self-start px-6 text-lg"
			>
				{pending ? 'Sending...' : 'Place order'}
			</Button>
		</form>
	);
}
