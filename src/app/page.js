import Category from "@/component/global/Category";
import PromoBanner from "@/component/global/PromoBanner";
import EditorPick from "@/component/home/EditorPick";
import LatestNews from "@/component/home/LatestNews";
import { getCachedPromoBanner, getCachedLatestArticleService, getCachedArticleListService, getCachedCategoryWidgetsService } from "@/services/CachedServices";
import { Suspense } from "react";

export default async function Home() {
  const promoPromise = getCachedPromoBanner('no-category');
  const latestPromise = getCachedLatestArticleService(1, 5);
  const editorsChoicePromise = getCachedArticleListService('get-editors-choice-article', 1, 6);
  const categoryWidgetsPromise = getCachedCategoryWidgetsService();

  const [promoResult, latestResult, editorsChoice, categoryWidgets] = await Promise.allSettled([ promoPromise, latestPromise, editorsChoicePromise, categoryWidgetsPromise ]);

  const promoData = promoResult.status === 'fulfilled' ? promoResult.value : null;
  const latestData = latestResult.status === 'fulfilled' ? latestResult.value : null;
  const editorsChoiceData = editorsChoice.status === 'fulfilled' ? editorsChoice.value : null;
  const categoryWidgetsData = categoryWidgets.status === 'fulfilled' ? categoryWidgets.value : null;
  
  return (
    <>
      {promoData && (
        <Suspense fallback={ <div className="h-64 bg-gray-100 animate-pulse rounded-xl mx-4 lg:mx-auto max-w-7xl mt-2 lg:mt-8" /> } >
          <PromoBanner PromoBannerData={promoData} />
        </Suspense>
      )}

      {latestData && <LatestNews LatestNewsData={latestData} />}
      {editorsChoiceData && <EditorPick EditorPick={editorsChoiceData} />}
      {categoryWidgetsData && <Category label="Category" CategoryWidgetsData={categoryWidgetsData} />}
    </>
  );
}