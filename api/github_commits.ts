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
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: `{"query":"query {\\n  user(login: \\"${body['login']}\\") {\\n    name\\n    contributionsCollection {\\n      contributionCalendar {\\n        colors\\n        totalContributions\\n        weeks {\\n          contributionDays {\\n            color\\n            contributionCount\\n            date\\n            weekday\\n          }\\n          firstDay\\n        }\\n      }\\n    }\\n  }\\n}"}`,
        headers: { 'Authorization': `bearer ${GITHUB_ACCESS_TOKEN}`,
        'Content-Type': 'text/plain' }
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