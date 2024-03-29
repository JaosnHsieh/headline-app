import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import capitalize from 'lodash.capitalize';
import { HEADLINE_CATEGORIES } from '@/app/[lang]/consts';
import { getCategoryHeadlines } from '@/app/[lang]/lib/getRandomTopHeadlines';
import { Headline } from '@/app/[lang]/components/Headline';

export const metadata: Metadata = {
  title: 'Headlines app category',
  description: 'show a category of headlines',
};

function CategoriesSelector({
  category,
  lang,
}: {
  category: string;
  lang: string;
}) {
  // fix tailwind css classes missing issue from https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  const colorVariants = {
    active: 'p-4 rounded shadow bg-slate-500 text-white',
    inactive:
      'p-4 rounded shadow bg-white hover:bg-slate-400 hover:text-white cursor-pointer',
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {HEADLINE_CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <Link href={`/${lang}/categories/${cat}`} key={cat}>
              <div
                className={
                  isActive ? colorVariants['active'] : colorVariants['inactive']
                }
              >
                {capitalize(cat)}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default async function Page({
  params,
}: {
  params: { category: string[]; lang: string };
}) {
  const category = params.category?.[0] ?? HEADLINE_CATEGORIES[0];
  if (HEADLINE_CATEGORIES.includes(category.toLowerCase()) === false) {
    redirect(`/${params.lang}/categories/${HEADLINE_CATEGORIES[0]}`);
  }
  const topHeadlines = await getCategoryHeadlines(category, params.lang);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-gray-100 py-6">
          <CategoriesSelector category={category} lang={params.lang} />
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">{`Latest ${category} headlines`}</h2>
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
