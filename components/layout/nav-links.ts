type NavLink = {
	href: string;
	label: string;
	activePaths?: string[];
};

export const navLinks: NavLink[] = [
	{ href: '/#about', label: 'About' },
	{ href: '/catalog', label: 'Catalog', activePaths: ['/catalog', '/toys'] },
	{
		href: '/orders/custom',
		label: 'Custom order',
		activePaths: ['/orders/custom'],
	},
	{ href: '#contacts', label: 'Contacts' },
];

export function isNavLinkActive(link: NavLink, pathname: string | null) {
	if (!pathname) return false;

	return (link.activePaths ?? []).some(
		path => pathname === path || pathname.startsWith(`${path}/`),
	);
}
