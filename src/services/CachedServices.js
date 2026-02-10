import { LatestArticleService, PromoBannerService } from "./ListingService";

export async function getCachedPromoBanner({ slug, lang }) {
  'use cache';

  console.log('[CACHE-TEST] Fetching promo banner — should only run once!');
  console.time('[CACHE-TEST] Promo');

  const data = await PromoBannerService({ slug, lang });

  console.timeEnd('[CACHE-TEST] Promo');
  return data;
}
export async function getCachedLatestArticleService({ pageNo = 0, limit = 10, lang }) {
  'use cache';

  console.log('[CACHE-TEST] Fetching promo banner — should only run once!');
  console.time('[CACHE-TEST] Promo');

  const data = await LatestArticleService({ pageNo, limit, lang });

  console.timeEnd('[CACHE-TEST] Promo');
  return data;
}