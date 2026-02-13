import PromoBanner from "@/component/global/PromoBanner";
import LatestNews from "@/component/home/LatestNews";
import { getCachedLatestArticleService, getCachedPromoBanner } from "@/services/CachedServices";
import { Suspense } from "react";

export default async function Home() {
  const PromoBannerApi = getCachedPromoBanner({slug:'no-category'});
  const LatestArticleApi = getCachedLatestArticleService({pageNo:'1',limit:'13'});
  const results = await Promise.allSettled([
    PromoBannerApi,
    LatestArticleApi
  ]);
  const PromoBannerData = results[0].status === 'fulfilled' ? results[0].value : null;
  const LatestArticleData = results[1].status === 'fulfilled' ? results[1].value : null;  
  // console.log(PromoBannerData);
  
  return (
    <>
      {PromoBannerData && <Suspense><PromoBanner PromoBannerData={PromoBannerData} /></Suspense>}
      {LatestArticleData && <LatestNews LatestNewsData={LatestArticleData} />}
    </>
  );
}
