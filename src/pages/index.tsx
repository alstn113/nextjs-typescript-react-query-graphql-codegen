import { GetServerSideProps } from 'next';
import { DehydratedState, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { GetReviewsQuery, useGetReviewsQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import ReviewCardComponent from '@/components/ReviewCard';

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
          <ReviewCardComponent review={review} />
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
