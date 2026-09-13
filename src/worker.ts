export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (req: Request) => Promise<Response> } }): Promise<Response> {
    const url = new URL(request.url);
    try {
      // Fetch static asset
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404) {
        // SPA Fallback for client-side routing
        return await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
      }
      return response;
    } catch {
      return await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
    }
  }
};
