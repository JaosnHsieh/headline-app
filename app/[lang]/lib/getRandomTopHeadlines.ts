import 'server-only';
import sampleSize from 'lodash.samplesize';
import { HEADLINE_CATEGORIES, HEADLINE_COUNTRIES } from '../consts';

export type HeadlineArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
//type docs from https://newsapi.org/docs/endpoints/top-headlines
export type TopHeadlineApiResOk = {
  status: 'ok';
  totalResults: number;
  articles: HeadlineArticle[];
};
export type TopHeadlineApiResError = {
  status: 'error';
  code: number;
  message: string;
};
export type TopHeadlineApiRes = TopHeadlineApiResOk | TopHeadlineApiResError;

export async function getCategoryHeadlines(
  category = HEADLINE_CATEGORIES[0],
): Promise<HeadlineArticle[]> {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWSAPI_KEY}&pageSize=10`,
    { cache: 'force-cache' },
  );
  if (!res.ok) {
    throw new Error('fetch error');
  }
  const json = (await res.json()) as TopHeadlineApiRes;
  if (json.status === 'error') {
    throw new Error('fetch error');
  }
  return json.articles as HeadlineArticle[];
}
export async function getRandomTopHeadlines(
  {
    size,
  }: {
    size: number;
  } = {
    size: 1,
  },
): Promise<HeadlineArticle[]> {
  const categories = sampleSize(HEADLINE_CATEGORIES, size);
  const countries = sampleSize(HEADLINE_COUNTRIES, size);
  const fetches = [
    ...categories.map((category) =>
      fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWSAPI_KEY}&pageSize=10`,
        { cache: 'force-cache' },
      ),
    ),
    ...countries.map((country) =>
      fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWSAPI_KEY}&pageSize=10`,
        { cache: 'force-cache' },
      ),
    ),
  ];

  const res = await Promise.all(fetches);
  const results = await Promise.all<TopHeadlineApiRes>(
    res
      .filter((r) => {
        if (r.ok) {
          return true;
        }
        // leave the error handling here for now
        console.error(`$ getCategoryHeadlines results error`, r.status);
      })
      .map((r) => r.json()),
  );

  //leave the error handling for now
  return results
    .filter((r) => r.status === 'ok')
    .map((r) => r.status === 'ok' && r.articles)
    .flat() as HeadlineArticle[];
}
