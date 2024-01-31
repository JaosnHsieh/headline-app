import { redirect } from 'next/navigation';
import Link from 'next/link';
import capitalize from 'lodash.capitalize';
import { HEADLINE_CATEGORIES } from '../../consts';
import { getCategoryHeadlines } from '../../lib/getRandomTopHeadlines';
import { Headline } from '../../components/Headline';

function CategoriesSelector({ category }: { category: string }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {HEADLINE_CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <Link href={`/categories/${cat}`} key={cat}>
              <div
                className={`bg-white p-4 rounded shadow ${
                  isActive
                    ? 'bg-slate-500 text-white'
                    : 'hover:bg-slate-400 hover:text-white cursor-pointer'
                }`}
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
  params: { category: string[] };
}) {
  const category = params.category?.[0] ?? HEADLINE_CATEGORIES[0];
  if (HEADLINE_CATEGORIES.includes(category.toLowerCase()) === false) {
    redirect(`/categories/${HEADLINE_CATEGORIES[0]}`);
  }
  const topHeadlines = await getCategoryHeadlines(category);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-gray-100 py-6">
          <CategoriesSelector category={category} />
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
