import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utility';
import { SLUG_DASHBOARD } from '@/app/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: `/${SLUG_DASHBOARD}`, // TODO: should pull from metadata for a real site
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
