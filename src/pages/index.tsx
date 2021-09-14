import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { DehydratedState, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { GetReviewsQuery, useGetReviewsQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
const HomePage = () => {
  const { isLoading, error, data } = useGetReviewsQuery<GetReviewsQuery, Error>(
    grahpqlRequestClient,
    {},
  );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return (
    <>
      {data?.reviews?.map((review) => (
        <div key={review?.id}>
          <div>{review?.rating}</div>
          <h2>{review?.title}</h2>
          {review?.categories?.map((c) => (
            <small key={c?.id}>{c?.name}</small>
          ))}
          <p>{review?.body.substring(0, 100)}</p>
          <Link href={`/details/${review?.id}`}>
            <a>Read More</a>
          </Link>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetReviewsQuery.getKey(),
    useGetReviewsQuery.fetcher(grahpqlRequestClient),
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default HomePage;
