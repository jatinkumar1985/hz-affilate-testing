import React from 'react'
import GlobalLink from '../global/GlobalLink'
import LazyMedia from '../global/LazyMedia'

export default function Explore({Explore,Label}) { 
    const categorySlug = Explore?.data?.article?.seo_details?.category?.category_slug;
    const subcategorySlug = Explore?.data?.article?.seo_details?.subcategory?.category_slug;
    return (
        <div className='max-w-7xl mx-4 lg:mx-auto mb-10'>
            {/* <h2 className='text-lg lg:text-xl uppercase font-[900] mb-4 lg:mb-6 border-b border-gray-900 pb-2 lg:pb-4'>{Label}</h2> */}
            <h2 className='text-xl lg:text-2xl uppercase font-[900] mb-4 lg:mb-6 flex justify-between items-center'>
                <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-pink-200 before:z-[-10]'>{Label}</span>
                <GlobalLink
                    href={`/${categorySlug}/${subcategorySlug}`}
                    className="inline-flex items-center gap-x-2 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
                >
                    <span className=''>View More</span>
                    {/* <ArrowRightIcon aria-hidden="true" className="-ml-0.5 size-4 text-red-700" /> */}
                </GlobalLink>
            </h2>
            <div className="space-y-6 mb-6 lg:grid lg:grid-cols-4 lg:gap-6">
                {Explore.data.article.rows.map((items, index) => {
                    const categorySlug = items?.category?.category_slug;
                    const subcategorySlug = items?.subcategory?.category_slug;
                    return(
                        <div key={index} className={`flex flex-row lg:flex-col rounded-xl overflow-hidden group`} >
                            {/* Image Section */}
                            <GlobalLink href={`/${categorySlug}/${subcategorySlug}/${items?.page_url}-${items?.id}`} className={`shrink-0 w-28 lg:w-full mb-2`} >
                                {/* <Image
                                    src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items.thumb_image}`}
                                    alt={items.title}
                                    width={1200}
                                    height={645}
                                    className={`object-cover rounded-xl`}
                                /> */}
                                <LazyMedia
                                    type="image"
                                    src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items.thumb_image}`}
                                    alt={items.title}
                                    width={1200}
                                    height={645}
                                    className={`object-cover rounded-xl`}
                                />
                            </GlobalLink>
                            <div className={`ml-4 lg:ml-0 lg:mt-2`} >
                                <p className={`mb-1 text-[9px]/2 uppercase text-pink-600 hover:text-pink-700`}>
                                    <GlobalLink href={`/${categorySlug}/${subcategorySlug}`}>{items.subcategory.category_name}</GlobalLink>
                                </p>
                                <h3 className={`text-gray-900 group-hover:underline text-[13px]/4 lg:text-base/5.5 font-bold`} >
                                    <GlobalLink href={`/${categorySlug}/${subcategorySlug}/${items?.page_url}-${items?.id}`}>{items.title}</GlobalLink>
                                </h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}