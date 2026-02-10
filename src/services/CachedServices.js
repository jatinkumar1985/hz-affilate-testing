import { cacheLife, cacheTag } from 'next/cache';
import { LatestArticleService, PromoBannerService } from "./ListingService";


// Option 1: 5 minutes → Very good balance for most list/promotion banners
export async function getCachedPromoBanner({ slug, lang }) {
    'use cache'
    cacheLife('minutes', 5)          // ← Add this line

    console.log('[CACHE-TEST] Fetching promo banner — should only run once!');
    console.time('[CACHE-TEST] Promo');

    const data = await PromoBannerService({ slug, lang });

    console.timeEnd('[CACHE-TEST] Promo');
    return data;
}


// Option 2: 3 minutes → little bit more fresh
export async function getCachedLatestArticleService({ pageNo = 0, limit = 10, lang }) {
    'use cache'
    cacheTag('latest-articles');      // For instant revalidation when publishing
    cacheLife('minutes', 3)           // ← Add this line

    console.log('[CACHE-TEST] Fetching latest articles — should only run once!');
    console.time('[CACHE-TEST] Latest Articles');

    const data = await LatestArticleService({ pageNo, limit, lang });

    console.timeEnd('[CACHE-TEST] Latest Articles');
    return data;
}