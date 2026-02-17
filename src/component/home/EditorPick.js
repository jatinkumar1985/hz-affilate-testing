"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import GlobalLink from '../global/GlobalLink';
import LazyMedia from '../global/LazyMedia';

export default function EditorPick({ EditorPick }) {
  // Fallback for missing data
  if (!EditorPick?.data?.article?.rows?.length) {
    return <div className="text-center py-10">No articles available</div>;
  }

  return (
    <>
      <div className='border-t-4 border-gray-100 pt-8 mb-4 lg:mb-10 lg:max-w-7xl lg:mx-auto'>
        <div className="max-w-7xl mx-auto px-4 lg:px-0 mb-4 lg:mb-4 lg:pt-6">
          {/* <div className="flex justify-center">
            <h2
              className="relative mb-4 lg:mb-6 inline-flex bg-[#fdc704] px-6 py-3 -mt-5 text-xl font-black uppercase rounded-b-lg
                before:absolute before:content-[''] before:border-b-[20px] before:border-b-[#ac8804] 
                before:border-l-[15px] before:border-l-transparent before:border-r-[0px] before:border-r-transparent
                before:top-0 before:-left-[15px]
                after:absolute after:content-[''] after:border-b-[20px] after:border-b-[#ac8804] 
                after:border-r-[15px] after:border-l-transparent after:border-l-[0px] after:border-r-transparent
                after:top-0 after:-right-[15px]"
            >
              Top Editor&apos;s Pick
            </h2>
          </div> */}
          <h2 className='text-xl lg:text-2xl uppercase font-[900] mb-4 lg:mb-6 flex justify-between items-center'>
              <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-yellow-300 before:z-[-10]'>Top Editor&apos;s Pick</span>
              <GlobalLink
                  href="/"
                  className="inline-flex items-center gap-x-2 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
              >
                  <span className=''>View More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="-ml-0.5 size-4 fill-red-700" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                  </svg>
                  {/* <ArrowRightIcon aria-hidden="true" className="-ml-0.5 size-4 text-red-700" /> */}
              </GlobalLink>
          </h2>
          {/* <div className='flex justify-center mb-4 lg:mb-6'>
              <GlobalLink
                  href="/"
                  className="inline-flex items-center gap-x-2 rounded-full bg-red-400 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
              >
                  View More
                  <ArrowRightIcon aria-hidden="true" className="-ml-0.5 size-4" />
              </GlobalLink>
          </div> */}
        </div>
        <Swiper
            // loop={true}
            className="mySwiper !px-4 lg:!px-0 !pb-10 lg:!pb-4"
            spaceBetween={25} // Add spacing between slides
            slidesPerView={1.5} // Show one slide at a time
            breakpoints={{
              640: { slidesPerView: 2.5, spaceBetween:20 }, // 2 slides on medium screens
              1024: { slidesPerView: 4, spaceBetween:20 }, // 3 slides on large screens
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-50/10 border !border-black/40 !w-2 !h-2 !mx-0.5',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-orange-600/100 !border-orange-600/100 !-mb-[1px] !w-2.5 !h-2.5 !scale-110',
            }}
            modules={[Pagination]}
          >
            {EditorPick.data.article.rows.slice(0, 4).map((item, index) => {
              const categorySlug = item?.category?.category_slug;
              const subcategorySlug = item?.subcategory?.category_slug;
              return (
                <SwiperSlide key={index} className="rounded-2xl lg:rounded-2xl bg-white group shadow-[0_0_15px_rgba(0,0,0,0.15)]">
                  <GlobalLink href={`/${categorySlug}/${subcategorySlug}/${item?.page_url}-${item?.id}`} className="mb-3 block">
                    {/* <Image
                      src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.thumb_image}`}
                      alt={item.title || 'Article image'}
                      width={1200}
                      height={675}
                      className="flex-none overflow-hidden lg:aspect-[3/2] rounded-2xl lg:rounded-2xl object-cover transition duration-300 ease-in-out w-full mb-2"
                      loading="lazy" // Explicit lazy loading
                    /> */}
                    <LazyMedia
                        type="image"
                        src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.thumb_image}`}
                        alt={item.title || 'Article image'}
                        width={1200}
                        height={675}
                        className="flex-none overflow-hidden lg:aspect-[3/2] rounded-t-2xl lg:rounded-t-2xl object-cover transition duration-300 ease-in-out w-full mb-1"
                    />
                  </GlobalLink>
                  <div className="px-4 pb-4">
                    <p className={`mb-1 text-[9px]/2 uppercase hover:text-red-700 text-red-500`}>
                      <GlobalLink href={`/${categorySlug}/${subcategorySlug}`}>{item.subcategory.category_name}</GlobalLink>
                    </p>
                    <h3
                      className={`text-gray-900 group-hover:underline text-[13px]/4 lg:text-base/5.5 font-bold line-clamp-3 lg:line-clamp-none min-h-12`}
                    >
                      <GlobalLink href={`/${categorySlug}/${subcategorySlug}/${item?.page_url}-${item?.id}`}>{item.title}</GlobalLink>
                    </h3>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
    </>
  );
}