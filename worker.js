const DOWNLOAD_PATH = "/download/BUILD_application_template.md";
const TEMPLATE_PATH = "/assets/BUILD_application_template.md";
const FILENAME = "BUILD_application_template.md";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== DOWNLOAD_PATH) {
      return env.ASSETS.fetch(request);
    }

    const assetResponse = await env.ASSETS.fetch(`https://assets.local${TEMPLATE_PATH}`);
    if (!assetResponse.ok) {
      return new Response("Template not found", {
        status: assetResponse.status,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const headers = new Headers(assetResponse.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Content-Disposition", `attachment; filename="${FILENAME}"`);

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      headers,
    });
  },
};
