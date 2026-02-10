const { default: axios } = require("axios");
// Updated payload with cache control headers
const payloadWithCache = { 
    headers: { 
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    } 
};

exports.MetaHomeService = async ({slug}) => {
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get_meta/${slug}`;
        const resp = await axios.get(apiPath, payloadWithCache);
        return resp.data;
    } catch (err) {
        return null;
    }
};