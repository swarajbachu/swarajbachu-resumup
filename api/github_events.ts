export const config = {
    runtime: 'edge',
  };
   
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  export default async function handler(request: Request) {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      body = null;
    }
    const response = await fetch(`https://api.github.com/users/${body['login']}/events?q=per_page:100`, {
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