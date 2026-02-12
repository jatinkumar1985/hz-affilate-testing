const { default: axios } = require("axios");
// Updated payload with cache control headers
const headers = { 
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
    'Cache-Control': 'public, max-age=120'
};
exports.PromoBannerService = async ({slug}) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}/get-slider/${slug}`;
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
exports.LatestArticleService = async ({ pageNo = 0, limit = 10 }) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}/get-article/${pageNo}/${limit}`;               
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
exports.SubCategoryListingService = async ({ category, subcategory, pageNo = 1, limit = 18 }) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}/get-article-by-subcategory/${category}/${subcategory}/${pageNo}/${limit}`;        
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