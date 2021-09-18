import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';

import { GetReviewQuery, useGetReviewQuery, useGetReviewsQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import ReviewDetail from '@/components/Review/ReviewDetail';

const ReviewDetailsPage = () => {
  const id = useRouter().query.id as string;
  const { isLoading, isError, error, data } = useGetReviewQuery<GetReviewQuery, Error>(
    grahpqlRequestClient,
    { id },
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error {error.message}</p>;
  return (
    <>
      <ReviewDetail review={data?.review} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
): Promise<
  | { redirect: { destination: string; permanent: boolean } }
  | {
      props: { dehydratedState: DehydratedState };
      revalidate: number;
    }
> => {
  const id = context?.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetReviewQuery.getKey({ id }),
    useGetReviewQuery.fetcher(grahpqlRequestClient, { id }),
  );
  const data = queryClient.getQueryData(useGetReviewQuery.getKey({ id }));

  if (!data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: { reviews: { id: string }[] } = await grahpqlRequestClient.request(
    useGetReviewsQuery.document,
  );

  const paths = data?.reviews?.map((review) => {
    return {
      params: {
        id: review.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export default ReviewDetailsPage;
