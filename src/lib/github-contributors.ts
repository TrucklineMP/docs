export type GitHubContributor = {
	login: string;
	html_url: string;
	avatar_url: string;
	contributions: number;
	type: string;
};

let cached: Promise<GitHubContributor[]> | undefined;

// Fetched once per build and shared by every page that renders contributors,
// so the unauthenticated GitHub API rate limit is not hit once per locale.
export function getGitHubContributors(): Promise<GitHubContributor[]> {
	cached ??= (async () => {
		try {
			const response = await fetch('https://api.github.com/repos/TrucklineMP/docs/contributors?per_page=100', {
				headers: {
					'User-Agent': 'TrucklineMP-Docs-Builder',
				},
			});
			if (!response.ok) return [];
			const data: GitHubContributor[] = await response.json();
			return data.filter((item) => item.type === 'User' && !item.login.endsWith('[bot]'));
		} catch (e) {
			console.error('Failed to fetch GitHub contributors:', e);
			return [];
		}
	})();
	return cached;
}
