export type Contributor = {
	github: string;
	displayName?: string;
	role: string;
	contributions: string[];
};

export const communityContributors: Contributor[] = [];

export const teamContributors: Contributor[] = [
	{
		github: 'olususus',
		displayName: 'Sprawdzany',
		role: 'Maintainer',
		contributions: ['Documentation site maintenance and English source content'],
	},
	{
		github: 'yazouv',
		displayName: 'Yazouv',
		role: 'Maintainer',
		contributions: ['Documentation site maintenance and English source content'],
	},
];
