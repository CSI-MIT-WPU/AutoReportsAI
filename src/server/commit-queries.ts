const getRepoCommits = async (
  name: string,
  owner: string,
  branch: string,
  accessToken: string,
  username: string,
  since: string,
  until: string,
  perPage: number
) => {
  let repoCommits: any = [];
  let pagesRemaining = true;
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  let url = `https://api.github.com/repos/${owner}/${name}/commits?sha=${branch}&since=${since}&until=${until}&per_page=${perPage}&author=${username}`;
  while (pagesRemaining) {
    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return errorText;
    }
    
    //processes commits and appends them into repoCommits
    const commits = await response.json();
    const processedCommits = await commits.map((commit: any) => ({
      date: commit.commit.committer.date,
      message: commit.commit.message,
    }));
    repoCommits.push(...processedCommits);

    //responsible fro pagination of commits
    const linkHeader = response.headers.get("link");
    pagesRemaining = linkHeader !== null && linkHeader.includes(`rel=\"next\"`);
    if (pagesRemaining) {
      const match = linkHeader?.match(nextPattern);
      if (match && match[0]) {
        url = match[0];
      } else {
        pagesRemaining = false;
      }
    }
  }
  return repoCommits;
};

export { getRepoCommits };
