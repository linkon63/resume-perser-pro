// Function to fetch GitHub user data
const fetchGitHubData =  async (githubUrl) => {
    const username = githubUrl.split('/').pop();
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
}

export { fetchGitHubData };