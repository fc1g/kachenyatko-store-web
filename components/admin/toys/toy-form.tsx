'use client';

import { type ReactNode, useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Toy, ToyCategory } from '@/lib/api/types';

import { saveToy } from './actions';
import {
	TOY_FIELDS,
	type ToyField,
	type ToyFormState,
	type ToyValues,
} from './toy-params';

const initialState: ToyFormState = { status: 'idle' };
const CATEGORIES_LIST_ID = 'toy-categories';

function toyValues(toy?: Toy): ToyValues {
	return {
		name: toy?.name ?? '',
		category_name: toy?.category.name ?? '',
		description: toy?.description ?? '',
		size: toy?.size ?? '',
		materials: toy?.materials ?? '',
	};
}

type ToyFormProps = {
	toy?: Toy;
	categories: ToyCategory[];
};

export function ToyForm({ toy, categories }: ToyFormProps) {
	const [state, formAction, pending] = useActionState(saveToy, initialState);
	const values = state.status === 'idle' ? toyValues(toy) : state.values;
	const error = state.status === 'error' ? state : null;

	const fieldProps = (field: ToyField) => ({
		id: field,
		name: field,
		required: true,
		maxLength: TOY_FIELDS[field].maxLength,
		defaultValue: values[field],
		'aria-invalid': error?.field === field || undefined,
		'aria-describedby': error?.field === field ? 'toy-error' : undefined,
	});

	return (
		<form action={formAction} className="flex flex-col gap-6">
			{toy && <input type="hidden" name="id" value={toy.id} />}
			<FormField field="name">
				<Input {...fieldProps('name')} className="h-10" />
			</FormField>

			<FormField
				field="category_name"
				hint="Pick an existing category or type a new one."
			>
				<Input
					{...fieldProps('category_name')}
					list={CATEGORIES_LIST_ID}
					autoComplete="off"
					className="h-10"
				/>
				<datalist id={CATEGORIES_LIST_ID}>
					{categories.map(category => (
						<option key={category.id} value={category.name} />
					))}
				</datalist>
			</FormField>

			<FormField field="description">
				<Textarea {...fieldProps('description')} rows={6} />
			</FormField>

			<div className="grid gap-6 sm:grid-cols-2">
				<FormField field="size">
					<Input {...fieldProps('size')} className="h-10" />
				</FormField>
				<FormField field="materials">
					<Input {...fieldProps('materials')} className="h-10" />
				</FormField>
			</div>

			<div className="flex flex-wrap items-center gap-4">
				<Button type="submit" size="lg" disabled={pending} className="px-5">
					{pending ? 'Saving...' : toy ? 'Save changes' : 'Create toy'}
				</Button>

				{error && (
					<p id="toy-error" role="alert" className="text-error">
						{error.error}
					</p>
				)}
				{state.status === 'saved' && !pending && (
					<p role="status" className="text-muted-foreground">
						Saved
					</p>
				)}
			</div>
		</form>
	);
}

function FormField({
	field,
	hint,
	children,
}: {
	field: ToyField;
	hint?: string;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor={field}>{TOY_FIELDS[field].label}</Label>
			{children}
			{hint && <p className="text-sm text-muted-foreground">{hint}</p>}
		</div>
	);
}
