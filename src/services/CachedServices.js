import { cacheLife, cacheTag } from 'next/cache';
import { LatestArticleService, PromoBannerService } from "./ListingService";


// Option 1: 5 minutes → Very good balance for most list/promotion banners
export async function getCachedPromoBanner({ slug }) {
    'use cache';
    cacheLife('minutes');
    cacheTag(`promo-banner-${slug}`);

    const data = await PromoBannerService({ slug });
    return data;
}


// Option 2: 3 minutes → little bit more fresh
export async function getCachedLatestArticleService({ pageNo = 0, limit = 10 }) {
    'use cache';
    cacheLife('minutes');
    cacheTag(`latest-articles-page-${pageNo}`);

    const data = await LatestArticleService({ pageNo, limit });
    return data;
}