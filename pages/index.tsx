import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'

const MAX_DISPLAY = 150

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const filtered = posts.filter((post) => post.slug !== `about`)
  console.log(filtered)

  return { props: { posts: filtered } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex justify-center">
        <ul className="max-w-2xl">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, lastmod, h1, summary } = frontMatter
            return (
              <li key={slug} className="py-8">
                <article>
                  <div className="xl:items-baseline xl:space-y-0">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/${slug}`} className="text-3xl">
                              {h1}
                            </Link>
                          </h2>
                        </div>
                        <div className="prose max-w-none text-smoke dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/${slug}`}
                          className="group outfit-medium inline-flex h-9 items-center whitespace-nowrap rounded-full bg-gray-100 px-3 text-sm font-semibold text-midnight opacity-100 hover:bg-gray-200 "
                          aria-label={`Read "${h1}"`}
                        >
                          Continue reading <span className="ml-1 text-pink">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
