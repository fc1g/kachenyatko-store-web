'use client';

import { useActionState, useId } from 'react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from '@/lib/api/types';

import { saveCategory } from './actions';
import { type CategoryFormState, NAME_MAX_LENGTH } from './category-params';

const initialState: CategoryFormState = { status: 'idle' };

type CategoryFormProps = {
	category?: Category;
	className?: string;
};

export function CategoryForm({ category, className }: CategoryFormProps) {
	const [state, formAction, pending] = useActionState(
		saveCategory,
		initialState,
	);
	const errorId = useId();
	const name = state.status === 'idle' ? (category?.name ?? '') : state.name;
	const error = state.status === 'error' ? state.error : null;

	return (
		<form action={formAction} className={cn('flex flex-col gap-2', className)}>
			{category && <input type="hidden" name="id" value={category.id} />}
			<div className="flex gap-2">
				<Input
					name="name"
					required
					maxLength={NAME_MAX_LENGTH}
					defaultValue={name}
					placeholder={category ? undefined : 'e.g. Soft toys'}
					aria-label={category ? `Name of ${category.name}` : 'New category'}
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? errorId : undefined}
					autoComplete="off"
					className="h-10"
				/>
				<Button
					type="submit"
					size="lg"
					variant={category ? 'outline' : 'default'}
					disabled={pending}
					className="h-10 px-4"
				>
					{pending ? 'Saving...' : category ? 'Rename' : 'Add'}
				</Button>
			</div>

			{error && (
				<p id={errorId} role="alert" className="text-sm text-error">
					{error}
				</p>
			)}
			{state.status === 'saved' && !pending && (
				<p role="status" className="text-sm text-muted-foreground">
					{category ? 'Saved' : 'Category added'}
				</p>
			)}
		</form>
	);
}
