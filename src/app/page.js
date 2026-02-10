import PromoBanner from "@/component/global/PromoBanner";
import Explore from "@/component/home/Explore";
import LatestNews from "@/component/home/LatestNews";
import { LatestArticleService, PromoBannerService, SubCategoryListingService } from "@/services/ListingService";
import { MetaHomeService } from "@/services/MetaService";
import { cache } from "react";

// Cache function to fetch article details
const getMetaHome = cache(async ({slug}) => {
  return await MetaHomeService({slug});
});
export async function generateMetadata(){
  const MetaApi = getMetaHome({slug:'home-page'});
  const [MetaResult] = await Promise.allSettled([MetaApi]);
  const MetaData = MetaResult.status === 'fulfilled' ? MetaResult.value : null;
  const Meta = MetaData?.data[0] || {};
  return {
    title: Meta.meta_title,
    description: Meta.meta_description,
    keywords: Meta.meta_keyword,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/`,
    },
    openGraph: {
      title: Meta.meta_title,
      description: Meta.meta_description,
      url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}`,
      images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
      siteName:process.env.NEXT_PUBLIC_DOMIN_NAME,
    },
  };
}
export default async function Home() {
  const MetaApi = getMetaHome({slug:'home-page'});
  const PromoBannerApi = PromoBannerService({slug:'no-category', lang:'en_US'});
  const LatestArticleApi = LatestArticleService({pageNo:'1',limit:'13', lang:'en_US'});
  const CameraListingApi = SubCategoryListingService({category:'electronics', subcategory:'camera', pageNo:'1',limit:'4', lang:'en_US'});
  const HeadphonesListingApi = SubCategoryListingService({category:'electronics', subcategory:'headphones', pageNo:'1',limit:'4', lang:'en_US'});
  const AirPurifiersListingApi = SubCategoryListingService({category:'appliances', subcategory:'air-purifiers', pageNo:'1',limit:'4', lang:'en_US'});
  const RoomHeatersListingApi = SubCategoryListingService({category:'appliances', subcategory:'room-heaters', pageNo:'1',limit:'4', lang:'en_US'});
  const results = await Promise.allSettled([
    MetaApi,
    PromoBannerApi,
    LatestArticleApi,
    CameraListingApi,
    HeadphonesListingApi,
    AirPurifiersListingApi,
    RoomHeatersListingApi
  ]);
  // Extract data with fallback for rejected promises
  const MetaData = results[0].status === 'fulfilled' ? results[0].value : null;
  const PromoBannerData = results[1].status === 'fulfilled' ? results[1].value : null;
  const LatestArticleData = results[2].status === 'fulfilled' ? results[2].value : null;
  const CameraListingData = results[3].status === 'fulfilled' ? results[3].value : null;
  const HeadphonesListingData = results[4].status === 'fulfilled' ? results[4].value : null;
  const AirPurifiersListingData = results[5].status === 'fulfilled' ? results[5].value : null;
  const RoomHeatersListingData = results[6].status === 'fulfilled' ? results[6].value : null;
  return (
    <>
      {PromoBannerData && <PromoBanner PromoBannerData={PromoBannerData} />}
      {LatestArticleData && <LatestNews LatestNewsData={LatestArticleData} />}
      {CameraListingData && <Explore Explore={CameraListingData} Label="Camera" />}
      {HeadphonesListingData && <Explore Explore={HeadphonesListingData} Label="Headphones" />}
      {AirPurifiersListingData && <Explore Explore={AirPurifiersListingData} Label="Air Purifier" />}
      {RoomHeatersListingData && <Explore Explore={RoomHeatersListingData} Label="Room Heaters" />}
    </>
  );
}
