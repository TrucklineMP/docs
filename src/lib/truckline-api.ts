export type RecognizedMember = {
	webId: number;
	name: string;
	handle: string | null;
	image: string | null;
	profileUrl: string;
	reason: string;
	grantedAt: string;
	grantedBy: { name: string };
};

export type BadgeProgram = {
	slug: string;
	name: string;
	description: string | null;
	icon: string;
	color: string;
	recipients: RecognizedMember[];
};

const DEFAULT_API_BASE = 'https://api.trucklinemp.com';

function normalizeApiBase(base: string): string {
	const trimmed = base.replace(/\/$/, '');

	if (/localhost|127\.0\.0\.1/.test(trimmed)) {
		return trimmed.endsWith('/api/v1') ? trimmed : `${trimmed}/api/v1`;
	}

	return trimmed.replace(/\/api\/v1$/, '');
}

function resolveApiBase(): string {
	const fromEnv = import.meta.env.TRUCKLINE_API_URL;
	if (typeof fromEnv === 'string' && fromEnv.trim()) {
		return normalizeApiBase(fromEnv.trim());
	}
	return DEFAULT_API_BASE;
}

function resolveApiUrl(path: string): string {
	const base = resolveApiBase();
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${base}${normalizedPath}`;
}

const CONTRIBUTOR_BADGE_PATH = '/programs/badges/contributor';

export function getContributorBadgeProgramUrl(): string {
	return resolveApiUrl(CONTRIBUTOR_BADGE_PATH);
}

export async function fetchContributorBadgeProgram(): Promise<BadgeProgram | null> {
	try {
		const res = await fetch(getContributorBadgeProgramUrl(), {
			headers: { Accept: 'application/json' },
		});
		if (!res.ok) return null;
		return (await res.json()) as BadgeProgram;
	} catch {
		return null;
	}
}
