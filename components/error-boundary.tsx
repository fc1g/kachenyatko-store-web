'use client';

import type { ReactNode } from 'react';
import { catchError } from 'next/error';

export const ErrorBoundary = catchError(
	({ fallback }: { fallback: ReactNode }) => fallback,
);
