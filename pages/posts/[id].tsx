import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Layout from 'components/layout'
import Date from 'components/date'
import { getAllPostIds, getPostData, IPostData } from 'lib/posts'
import utilStyles from 'styles/utils.module.scss'

interface IPostProps {
  postData: IPostData;
}

export default function Post({ postData }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml! }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id
  const postData = await getPostData(id as string)
  return {
    props: {
      postData
    }
  }
}