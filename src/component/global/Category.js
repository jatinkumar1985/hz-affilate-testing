"use client"
// components/Category.js
import React, { useState, useEffect } from 'react';
import GlobalLink from '../global/GlobalLink';
import NotFound from './NotFound';
import LazyMedia from './LazyMedia';

export default function Category({ CategoryWidgetsData, label }) {
  const [activeTab, setActiveTab] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const payloadWithCache = { 
    headers: { 
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        'Cache-Control': 'public, max-age=120'
    } 
};

  const API_BASE = process.env.NEXT_PUBLIC_MODE_BASE_API;

  const fetchArticles = async (tab) => {
    if (activeTab?.id === tab.id) return; // Prevent refetch if same tab

    setIsFading(true); // Start fade out

    // Wait for fade-out to complete (300ms), then fetch new data
    setTimeout(async () => {
        setLoading(true);
        try {
        let url = '';

        if (tab.subcategory) {
            const { category_slug: catSlug } = tab.category;
            const { category_slug: subSlug } = tab.subcategory;
            url = `${API_BASE}/get-article-by-subcategory/${catSlug}/${subSlug}/0/10`;
        } else {
            const { category_slug } = tab.category;
            url = `${API_BASE}/get-article-by-category/${category_slug}/0/10`;
        }

        const res = await fetch(url, payloadWithCache);
        const data = await res.json();

        setArticles(data.data?.article?.rows || []);
        setActiveTab(tab);
        } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
        } finally {
        setLoading(false);
        setIsFading(false); // Fade in complete
        }
    }, 300); // Match this with your CSS transition duration
    };

  // Load the first tab on component mount
  useEffect(() => {
    if (CategoryWidgetsData?.data?.widgets?.length > 0) {
      fetchArticles(CategoryWidgetsData.data.widgets[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CategoryWidgetsData]);

  // Helper: Get slug for "View More" link
  const getActiveSlug = () => {
    if (!activeTab) return '/';
    if (activeTab.subcategory) {
      return `/${activeTab.category.category_slug}/${activeTab.subcategory.category_slug}`;
    }
    return `/${activeTab.category.category_slug}`;
  };

  // Helper: Get display name for button
  const getActiveDisplayName = () => {
    if (!activeTab) return '';
    return activeTab.subcategory?.category_name || activeTab.category.category_name;
  };

  if (!CategoryWidgetsData?.data?.widgets) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto mb-6 lg:mb-20">
      {/* Header + Tabs */}
      <div className="flex flex-col lg:flex-row lg:justify-between space-y-1 mb-6 mx-4 lg:mx-0">
        {/* <h2 className="text-lg lg:text-2xl uppercase font-black mb-2 lg:mb-0">
          {label}
        </h2> */}
        <h2 className='text-xl lg:text-2xl uppercase font-[900] mb-4 lg:mb-0 flex justify-between items-center'>
            <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-yellow-300 before:z-[-10]'>{label}</span>
            {/* <GlobalLink
                href="/latest-product-news"
                className="inline-flex items-center gap-x-2 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
            >
                <span className=''>View More</span>
                <ArrowRightIcon aria-hidden="true" className="-ml-0.5 size-4 text-red-700" />
            </GlobalLink> */}
        </h2>
        {/* <span className="flex-1 h-[1px] bg-gray-200 ml-3 mr-5 relative top-4"></span> */}

        <nav
          aria-label="Tabs"
          className="flex scrollbar-hide overflow-x-scroll space-x-2"
        >
          {CategoryWidgetsData.data.widgets.map((tab) => {
            const displayName =
              tab.subcategory?.category_name ?? tab.category.category_name;
            const isActive = activeTab && activeTab.id === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => fetchArticles(tab)}
                className={`rounded-full cursor-pointer px-4 lg:px-8 py-2 lg:py-2 text-xs tracking-tight capitalize whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#ffb86a] text-black font-bold'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-950 font-medium'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Articles Grid with Fade Animation */}
      <div className={`px-4 lg:px-0 mb-2 lg:mb-8 lg:grid lg:grid-cols-4 space-y-4 lg:gap-6 transition-opacity duration-300 ease-in-out ${isFading || loading ? 'opacity-0' : 'opacity-100'}`} >
        {loading ? (
          <div className="col-span-4 flex justify-center items-center h-64">
            <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className='flex justify-center col-span-4'>
            <NotFound
              title="No Article"
              label="There have been no article in this section yet"
            />
          </div>
        ) : (
          articles.slice(0, 4).map((item, index) => {
            const categorySlug = item?.category?.category_slug || '';
            const subcategorySlug = item?.subcategory?.category_slug || '';
            const articleUrl = subcategorySlug
              ? `/${categorySlug}/${subcategorySlug}/${item.page_url}-${item.id}`
              : `/${categorySlug}/${item.page_url}-${item.id}`;

            return (
              <div
                key={item.id} // Better: use item.id instead of index
                className="flex flex-row lg:flex-col rounded-xl overflow-hidden group"
              >
                <GlobalLink href={articleUrl} className="shrink-0 w-28 lg:w-full mb-2">
                  {/* <Image
                    src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.thumb_image}`}
                    alt={item.title}
                    width={1200}
                    height={645}
                    className="object-cover rounded-xl w-full"
                  /> */}
                  <LazyMedia
                      type="image"
                      src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.thumb_image}`}
                      alt={item.title}
                      width={1200}
                      height={645}
                      className="object-cover rounded-xl w-full"
                  />
                </GlobalLink>

                <div className="ml-4 lg:ml-0 lg:mt-2">
                  <p className="mb-1 text-[9px] leading-tight uppercase text-red-500 hover:text-red-700">
                    <GlobalLink href={`/${categorySlug}/${subcategorySlug}`}>
                      {item.subcategory.category_name}
                    </GlobalLink>
                  </p>
                  <h3 className=" text-gray-900 group-hover:underline text-[13px]/4 lg:text-base/5.5 font-bold">
                    <GlobalLink href={articleUrl}>{item.title}</GlobalLink>
                  </h3>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View More Button */}
      <div className="flex justify-center">
        <GlobalLink
          href={getActiveSlug()}
          className="inline-flex items-center gap-x-2 rounded-full bg-orange-100 px-6 py-2.5 text-xs font-semibold text-red-600 hover:bg-black uppercase"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="-ml-0.5 size-4 fill-red-700" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
          </svg>
          {/* {getActiveDisplayName()} */}
          {/* <ArrowRightIcon aria-hidden="true" className="-ml-0.5 size-3.5" /> */}
        </GlobalLink>
      </div>
    </div>
  );
}