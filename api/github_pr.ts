export const config = {
    runtime: 'edge',
  };
   
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  export default async function handler(request: Request) {
    const response = await fetch('https://api.github.com/search/issues?q=author:Aarush-Acharya&type:issue&state:open&is:open', {
        method: 'GET',
        headers: {       'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28' }
      });
    const json = await response.json();
    return new Response(
      JSON.stringify({
        json
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }