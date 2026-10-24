import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function AdminNotFound() {
	return (
		<div className="flex flex-col items-center gap-4 py-16 text-center">
			<h1 className="text-3xl font-bold">Not found</h1>
			<p className="text-muted-foreground">
				It may have been deleted or the link is wrong.
			</p>
			<Button nativeButton={false} render={<Link href="/admin/orders" />}>
				Back to orders
			</Button>
		</div>
	);
}
