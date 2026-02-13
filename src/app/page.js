import PromoBanner from "@/component/global/PromoBanner";
import LatestNews from "@/component/home/LatestNews";
import { LatestArticleService, PromoBannerService } from "@/services/ListingService";

export default async function Home() {
  const PromoBannerApi = PromoBannerService({slug:'no-category'});
  const LatestArticleApi = LatestArticleService({pageNo:'1',limit:'13'});
  const results = await Promise.allSettled([
    PromoBannerApi,
    LatestArticleApi
  ]);
  const PromoBannerData = results[0].status === 'fulfilled' ? results[0].value : null;
  const LatestArticleData = results[1].status === 'fulfilled' ? results[1].value : null;  
  // console.log(PromoBannerData);
  
  return (
    <>
      {PromoBannerData && <PromoBanner PromoBannerData={PromoBannerData} />}
      {LatestArticleData && <LatestNews LatestNewsData={LatestArticleData} />}
    </>
  );
}
