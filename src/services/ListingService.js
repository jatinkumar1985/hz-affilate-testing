const { default: axios } = require("axios");
// Updated payload with cache control headers
const headers = { 
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`
};
exports.PromoBannerService = async ({slug,lang}) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${lang}/get-slider/${slug}`;
        const resp = await axios.get(apiPath, {
            headers,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        return resp.data;
    } catch (err) {
        return null;
    }
};
exports.LatestArticleService = async ({ pageNo = 0, limit = 10, lang }) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${lang}/get-article/${pageNo}/${limit}`;               
        const resp = await axios.get(apiPath, {
            headers,
            cache: 'no-store',
            next: { revalidate: 0 }
        });        
        return resp.data;
    } catch (err) {
        return null;
    }
};
exports.SubCategoryListingService = async ({ category, subcategory, pageNo = 1, limit = 18, lang }) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${lang}/get-article-by-subcategory/${category}/${subcategory}/${pageNo}/${limit}`;        
        const resp = await axios.get(apiPath, {
            headers,
            cache: 'no-store',
            next: { revalidate: 0 }
        });
        return resp.data;
    } catch (err) {
        return null;
    }
};