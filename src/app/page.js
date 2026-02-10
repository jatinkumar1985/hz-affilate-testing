export const dynamic = 'force-dynamic'
export const revalidate = 0

import PromoBanner from "@/component/global/PromoBanner";
import LatestNews from "@/component/home/LatestNews";
import { LatestArticleService, PromoBannerService } from "@/services/ListingService";

// Cache function to fetch article details
// const getMetaHome = cache(async ({slug}) => {
//   return await MetaHomeService({slug});
// });
// export async function generateMetadata(){
//   const MetaApi = getMetaHome({slug:'home-page'});
//   const [MetaResult] = await Promise.allSettled([MetaApi]);
//   const MetaData = MetaResult.status === 'fulfilled' ? MetaResult.value : null;
//   const Meta = MetaData?.data[0] || {};
//   return {
//     title: Meta.meta_title,
//     description: Meta.meta_description,
//     keywords: Meta.meta_keyword,
//     robots: {
//       index: false,
//       follow: false,
//       googleBot: {
//         'max-image-preview': 'large',
//       },
//     },
//     alternates: {
//       canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/`,
//     },
//     openGraph: {
//       title: Meta.meta_title,
//       description: Meta.meta_description,
//       url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}`,
//       images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
//       siteName:process.env.NEXT_PUBLIC_DOMIN_NAME,
//     },
//   };
// }
export default async function Home() {
  // const MetaApi = getMetaHome({slug:'home-page'});
  const PromoBannerApi = PromoBannerService({slug:'no-category', lang:'en_US'});
  const LatestArticleApi = LatestArticleService({pageNo:'1',limit:'13', lang:'en_US'});
  const results = await Promise.allSettled([
    // MetaApi,
    PromoBannerApi,
    LatestArticleApi
  ]);
  // Extract data with fallback for rejected promises
  // const MetaData = results[0].status === 'fulfilled' ? results[0].value : null;
  const PromoBannerData = results[0].status === 'fulfilled' ? results[0].value : null;
  const LatestArticleData = results[1].status === 'fulfilled' ? results[1].value : null;
  return (
    <>
      {PromoBannerData && <PromoBanner PromoBannerData={PromoBannerData} />}
      {LatestArticleData && <LatestNews LatestNewsData={LatestArticleData} />}
    </>
  );
}
