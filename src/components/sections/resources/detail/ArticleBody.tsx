import {
  PortableText,
  type InferComponents,
} from 'next-sanity'

import type {ARTICLE_BY_SLUG_QUERY_RESULT} from '@/sanity/sanity.types'

type ArticleContent = NonNullable<ARTICLE_BY_SLUG_QUERY_RESULT>['content']

const components = {
  block: {
    normal: ({children}) => (
      <p className="my-5 leading-8 text-muted">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-foreground sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-7 mb-3 text-lg font-bold text-foreground sm:text-xl">
        {children}
      </h4>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="my-5 ml-6 list-disc space-y-2 marker:text-secondary">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="my-5 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-primary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}) => (
      <li className="pl-2 leading-7 text-muted">{children}</li>
    ),
    number: ({children}) => (
      <li className="pl-2 leading-7 text-muted">{children}</li>
    ),
  },
  marks: {
    strong: ({children}) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({children}) => <em>{children}</em>,
    link: ({children, value}) => {
      if (!value?.href) return <>{children}</>

      return (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline decoration-primary/50 underline-offset-4 hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {children}
        </a>
      )
    },
  },
} satisfies InferComponents<ArticleContent>

export interface ArticleBodyProps {
  content: ArticleContent
}

export function ArticleBody({content}: ArticleBodyProps) {
  return <PortableText value={content} components={components} />
}
