import { cacheLife, cacheTag } from 'next/cache';
import { PromoBannerService, LatestArticleService, ArticleListService, CategoryWidgetsService } from './ListingService';

// Recommended: use 'hours' for most promo banners (changes rarely)
export async function getCachedPromoBanner(slug) {
  'use cache';
  
  cacheLife('hours');                    // ← best balance for promo banners
  // Alternative (if it changes more often):
  // cacheLife('minutes');
  // or custom: cacheLife({ revalidate: 1800, expire: 86400 }); // 30 min / 1 day
  
  cacheTag(`promo-banner-${slug}`);
  // Optional: add generic tag for bulk invalidation
  // cacheTag('all-promos');

  const data = await PromoBannerService({ slug });
  return data;
}

export async function getCachedLatestArticleService(pageNo = 0, limit = 10) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`latest-articles-page-${pageNo}`);

  const data = await LatestArticleService({ pageNo, limit });
  return data;
}

export async function getCachedArticleListService(categoryType, pageNo = 0, limit = 10) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`articles-list-${pageNo}`);

  const data = await ArticleListService({ categoryType, pageNo, limit });
  return data;
}

export async function getCachedCategoryWidgetsService() {
  'use cache';
  
  cacheLife('max');                  // Rarely changes
  cacheTag(`category-widgets`);

  const data = await CategoryWidgetsService();
  return data;
}