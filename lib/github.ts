const GITHUB_USERNAME = "mohnishgorana1";

export type Commit = {
    sha: string;
    message: string;
};

export type Repo = {
    id: number;
    name: string;
    html_url: string;
    language: string | null;
    full_name: string;
};

export type GithubEvent = {
    id: string;
    type: string;
    created_at: string;
    repo: { name: string };
    payload?: {
        commits?: { message: string }[];
    };
};

export type GithubActivityData = {
    events: GithubEvent[];
    pinnedRepos: Repo[];
    activeRepos: Repo[];
    commitsMap: Record<number, Commit[]>;
};

// Empty fallback shape — used if the GitHub API fails, so the page never crashes
const EMPTY_DATA: GithubActivityData = {
    events: [],
    pinnedRepos: [],
    activeRepos: [],
    commitsMap: {},
};

export async function fetchGithubActivityData(): Promise<GithubActivityData> {
    try {
        const [eventsRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=15`, {
                next: { revalidate: 900 }, // cache 15 min on the server
            }),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`, {
                next: { revalidate: 900 },
            }),
        ]);

        if (!eventsRes.ok || !reposRes.ok) {
            console.error("[github] Failed fetching events/repos", eventsRes.status, reposRes.status);
            return EMPTY_DATA;
        }

        const eventsData: GithubEvent[] = await eventsRes.json();
        const reposData: Repo[] = await reposRes.json();

        const filteredEvents = eventsData
            .filter((event) => ["PushEvent", "CreateEvent"].includes(event.type))
            .slice(0, 5);

        const topRepos = [...reposData]
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 4);

        const topRepoIds = new Set(topRepos.map((repo) => repo.id));
        const recentRepos = reposData.filter((repo) => !topRepoIds.has(repo.id)).slice(0, 4);

        const allRepos = [...topRepos, ...recentRepos];

        const commitResults = await Promise.all(
            allRepos.map(async (repo) => {
                try {
                    const res = await fetch(
                        `https://api.github.com/repos/${repo.full_name}/commits?per_page=3`,
                        { next: { revalidate: 900 } }
                    );
                    if (!res.ok) return { id: repo.id, commits: [] as Commit[] };
                    const data = await res.json();
                    const commits: Commit[] = data.map((c: any) => ({
                        sha: c.sha,
                        message: c.commit?.message?.split("\n")[0] || "Updated code",
                    }));
                    return { id: repo.id, commits };
                } catch {
                    return { id: repo.id, commits: [] as Commit[] };
                }
            })
        );

        const commitsMap: Record<number, Commit[]> = {};
        commitResults.forEach(({ id, commits }) => {
            commitsMap[id] = commits;
        });

        return {
            events: filteredEvents,
            pinnedRepos: topRepos,
            activeRepos: recentRepos,
            commitsMap,
        };
    } catch (error) {
        console.error("[github] fetchGithubActivityData failed", error);
        return EMPTY_DATA;
    }
}