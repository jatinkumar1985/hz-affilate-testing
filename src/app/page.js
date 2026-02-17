import PromoBanner from "@/component/global/PromoBanner";
import EditorPick from "@/component/home/EditorPick";
import LatestNews from "@/component/home/LatestNews";
import { getCachedPromoBanner, getCachedLatestArticleService, getCachedArticleListService } from "@/services/CachedServices";
import { Suspense } from "react";

export default async function Home() {
  const promoPromise = getCachedPromoBanner('no-category');
  const latestPromise = getCachedLatestArticleService(1, 5);
  const editorsChoicePromise = getCachedArticleListService('get-editors-choice-article', 1, 6);

  const [promoResult, latestResult, editorsChoice] = await Promise.allSettled([ promoPromise, latestPromise, editorsChoicePromise ]);

  const promoData = promoResult.status === 'fulfilled' ? promoResult.value : null;
  const latestData = latestResult.status === 'fulfilled' ? latestResult.value : null;
  const editorsChoiceData = editorsChoice.status === 'fulfilled' ? editorsChoice.value : null;
  
  return (
    <>
      {promoData && (
        <Suspense fallback={ <div className="h-64 bg-gray-100 animate-pulse rounded-xl mx-4 lg:mx-auto max-w-7xl mt-2 lg:mt-8" /> } >
          <PromoBanner PromoBannerData={promoData} />
        </Suspense>
      )}

      {latestData && <LatestNews LatestNewsData={latestData} />}
      {editorsChoiceData && <EditorPick EditorPick={editorsChoiceData} />}
    </>
  );
}