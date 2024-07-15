export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // Proxy API requests to CoinGecko
      const apiUrl = new URL(url.pathname.replace('/api/', ''), 'https://api.coingecko.com/api/v3/');
      apiUrl.search = url.search;
      const apiRequest = new Request(apiUrl, request);
      return fetch(apiRequest);
    }
    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};