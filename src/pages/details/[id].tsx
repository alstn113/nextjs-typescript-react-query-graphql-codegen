import { GetReviewQuery, useGetReviewQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';

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
      <div>{data?.review?.rating}</div>
      <h2>{data?.review?.title}</h2>
      {data?.review?.categories?.map((c) => (
        <small key={c?.id}>{c?.name}</small>
      ))}
      <p>{data?.review?.body}</p>s
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const id = context.query.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetReviewQuery.getKey({ id }),
    useGetReviewQuery.fetcher(grahpqlRequestClient, { id }),
  );
  console.log(queryClient);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default ReviewDetailsPage;
