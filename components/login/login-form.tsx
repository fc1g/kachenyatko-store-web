'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { loginAction, type LoginFormState } from './actions';

const initialState: LoginFormState = {};

// next is the page to return to after logging in, set by proxy.ts
export function LoginForm({ next }: { next?: string }) {
	const [state, formAction, pending] = useActionState(
		loginAction,
		initialState,
	);

	return (
		<form action={formAction} className="flex flex-col gap-6">
			{next && <input type="hidden" name="next" value={next} />}
			<div className="flex flex-col gap-2">
				<Label htmlFor="email" className="text-base">
					Email
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
					defaultValue={state.email}
					aria-invalid={Boolean(state.error) || undefined}
					aria-describedby={state.error ? 'login-error' : undefined}
					className="h-11 text-base md:text-base"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="password" className="text-base">
					Password
				</Label>
				<Input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					aria-invalid={Boolean(state.error) || undefined}
					aria-describedby={state.error ? 'login-error' : undefined}
					className="h-11 text-base md:text-base"
				/>
			</div>

			{state.error && (
				<p id="login-error" role="alert" className="text-error">
					{state.error}
				</p>
			)}

			<Button type="submit" disabled={pending} className="h-12 px-6 text-lg">
				{pending ? 'Logging in...' : 'Log in'}
			</Button>
		</form>
	);
}
