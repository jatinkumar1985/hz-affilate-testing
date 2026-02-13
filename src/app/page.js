import PromoBanner from "@/component/global/PromoBanner";
import LatestNews from "@/component/home/LatestNews";
import { getCachedPromoBanner, getCachedLatestArticleService } from "@/services/CachedServices";
import { Suspense } from "react";

export default async function Home() {
  const promoPromise = getCachedPromoBanner('no-category');
  const latestPromise = getCachedLatestArticleService(1, 13); // pageNo=1, limit=13

  const [promoResult, latestResult] = await Promise.allSettled([
    promoPromise,
    latestPromise,
  ]);

  const promoData = promoResult.status === 'fulfilled' ? promoResult.value : null;
  const latestData = latestResult.status === 'fulfilled' ? latestResult.value : null;

  return (
    <>
      {promoData && (
        <Suspense 
          fallback={
            <div className="h-64 bg-gray-100 animate-pulse rounded-xl mx-4 lg:mx-auto max-w-7xl mt-2 lg:mt-8" />
          }
        >
          <PromoBanner PromoBannerData={promoData} />
        </Suspense>
      )}

      {latestData && <LatestNews LatestNewsData={latestData} />}
    </>
  );
}