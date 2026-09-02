const DEVELOPMENT_SITE_URL = "http://localhost:3000";

function resolveSiteUrl() {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "development") {
      return DEVELOPMENT_SITE_URL;
    }

    throw new Error("SITE_URL must be configured outside development.");
  }

  let url: URL;

  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error("SITE_URL must be a valid absolute URL.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("SITE_URL must use the http or https protocol.");
  }

  if (
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("SITE_URL must contain only the site origin.");
  }

  return url.origin;
}

export const siteUrl = resolveSiteUrl();

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, `${siteUrl}/`).toString();
}
