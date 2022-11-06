import PageTitle from '@/components/PageTitle'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ReactNode } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Toc } from 'types/Toc'
import TOCSidebar from '@/components/TOCSidebar'
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share'
import Magnet from '@/components/Magnet'

interface Props {
  frontMatter: PostFrontMatter
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  toc: Toc
}

export default function PostLayout({ frontMatter, children, toc }: Props) {
  const { slug, lastmod, h1 } = frontMatter
  const url = `${siteMetadata.siteUrl}/${slug}`

  return (
    <div>
      <BlogSEO url={url} {...frontMatter} />
      <ScrollTopAndComment />
      <article className="mx-auto">
        <div>
          <div className="pb-8  " style={{ gridTemplateRows: 'auto 1fr' }}>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="lg:flex">
                <div className="prose mx-auto max-w-2xl pt-6 pb-8 dark:prose-dark">
                  <PageTitle>{h1}</PageTitle>
                  {children}
                </div>
                <div className="sticky top-0 hidden h-screen pt-6 pb-8 pl-6 lg:block xl:pl-10">
                  <TOCSidebar toc={toc} asDisclosure />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
