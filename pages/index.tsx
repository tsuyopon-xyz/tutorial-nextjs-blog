import { GetStaticProps } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from 'components/layout';
import Date from 'components/date';
import utilStyles from 'styles/utils.module.scss';
import { getSortedPostsData, IPostData } from 'lib/posts';

interface IHomeProps {
  allPostsData: IPostData[]
};

export default function Home({ allPostsData }: IHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          NextのTutorialに取り組んでます。(
          <a
            href="https://nextjs.org/learn/basics/create-nextjs-app"
            target="_blank"
          >
            https://nextjs.org/learn/basics/create-nextjs-app
          </a>
          )
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async _context => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}
