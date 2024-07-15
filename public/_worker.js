export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // Proxy API requests to CoinGecko
      const apiUrl = new URL(url.pathname.replace('/api/', ''), 'https://api.coingecko.com/api/v3/');
      apiUrl.search = url.search;
      const apiRequest = new Request(apiUrl, request);
      const response = await fetch(apiRequest);
      
      // Add CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
      
      const newResponse = new Response(response.body, response);
      Object.keys(corsHeaders).forEach(key => {
        newResponse.headers.set(key, corsHeaders[key]);
      });
      
      return newResponse;
    }
    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};