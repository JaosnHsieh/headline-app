import type { Metadata } from 'next';
import { getRandomTopHeadlines } from '@/app/[lang]/lib/getRandomTopHeadlines';
import { Headline } from '@/app/[lang]/components/Headline';

export const metadata: Metadata = {
  title: 'Headlines app homepage',
  description:
    'an app provides multiple languages headlines from multiple countries.',
};

export default async function Home({
  params,
}: {
  params: { category: string[]; lang: string };
}) {
  const topHeadlines = await getRandomTopHeadlines(params.lang);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">{'Latest Headlines'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topHeadlines.length === 0 ? (
                <span>{'No headlines available'}</span>
              ) : (
                topHeadlines.map((a) => <Headline key={a.url} article={a} />)
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
