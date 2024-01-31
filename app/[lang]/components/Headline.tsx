import Link from 'next/link';
import { HeadlineArticle } from '../lib/getRandomTopHeadlines';

export function Headline({ article }: { article: HeadlineArticle }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <Link href={article.url}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Headline image"
          className="w-full h-48 object-cover mb-4 rounded"
          src={article.urlToImage ?? 'https://placehold.co/600x400'}
        />
        <h3 className="font-bold truncate ...">{article.title}</h3>
        <p className="text-sm text-gray-500 truncate ...">
          {article.source.name}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        <p className="mt-2 text-gray-700">{article.description}</p>
      </Link>
    </div>
  );
}
