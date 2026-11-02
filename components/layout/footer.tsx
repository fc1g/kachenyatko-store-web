import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.jpg';

import { navLinks } from './nav-links';
import { InstagramIcon } from '@/components/icons/instagram-icon';
import { INSTAGRAM_URL } from '@/lib/instagram';

// TODO: replace placeholders with real contacts
const contacts = {
	phone: '+380 00 000 0000',
	email: 'contact@example.com',
	instagram: INSTAGRAM_URL,
};

export function Footer() {
	return (
		<footer id="contacts" className="bg-primary text-primary-foreground">
			<div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-12 md:flex-row md:gap-24 md:px-12 lg:gap-36">
				<Link href="/" className="size-32 shrink-0">
					<Image
						src={logo}
						alt="Kachenyatko — home"
						sizes="128px"
						placeholder="blur"
						className="size-full rounded-full"
					/>
				</Link>

				<nav>
					<ul className="flex flex-col gap-8">
						{navLinks.map(({ href, label }) => (
							<li key={href}>
								<Link
									href={href}
									className="transition-opacity hover:opacity-70"
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex flex-col gap-8">
					<p className="hidden font-semibold md:block">Contacts</p>
					<span title="Demo placeholder">{contacts.phone}</span>
					<span title="Demo placeholder">{contacts.email}</span>
					<a
						href={contacts.instagram}
						aria-label="Instagram"
						target="_blank"
						rel="noopener noreferrer"
						className="w-fit transition-opacity hover:opacity-70"
					>
						<InstagramIcon className="size-6" />
					</a>
				</div>
			</div>
		</footer>
	);
}
