export async function PromoBannerService(params) {
  const { slug } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-slider/${slug}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        // Cache-Control header is optional – Next.js prioritizes its own caching
        // 'Cache-Control': 'public, max-age=300'
      },
      // IMPORTANT: remove these – let 'use cache' + cacheLife control caching
      // cache: 'no-store',
      // next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('PromoBannerService error:', error);
    return null;
  }
}

export async function LatestArticleService(params) {
  const { pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article/${pageNo}/${limit}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function ArticleListService(params) {
  const { categoryType, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${categoryType}/${pageNo}/${limit}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}

// You can convert other services (SubCategoryListingService etc.) the same way...