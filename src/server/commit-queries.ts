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
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${name}/commits?sha=${branch}&since=${since}&until=${until}&per_page=${perPage}&author=${username}`,
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

  const commits = await response.json();
  const processedCommits = await commits.map((commit: any) => ({
    date: commit.commit.committer.date,
    message: commit.commit.message,
  }));
  return processedCommits;
};

export { getRepoCommits };
