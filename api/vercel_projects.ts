export const config = {
  runtime: 'edge',
};

const VERCEL_AUTH_TOKEN = process.env.VERCEL_AUTH_TOKEN;

export default async function handler(request: Request) {
  const response = await fetch('https://api.vercel.com/v9/projects', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${VERCEL_AUTH_TOKEN}` }
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