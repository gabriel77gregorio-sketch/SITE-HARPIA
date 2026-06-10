import type { APIRoute } from 'astro';

let cachedData: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutos

export const GET: APIRoute = async () => {
  const now = Date.now();
  
  if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=900'
      }
    });
  }

  try {
    const tickers = 'BGI1!,CCM1!,ICF1!';
    const token = import.meta.env.BRAPI_TOKEN || ''; 
    const url = `https://brapi.dev/api/quote/${tickers}${token ? `?token=${token}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch from Brapi');
    }
    
    const data = await response.json();
    cachedData = data;
    lastFetchTime = now;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=900'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
