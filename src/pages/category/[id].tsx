import { GetCategoryQuery, useGetCategoryQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';

const CategoryPage = () => {
  const id = useRouter().query.id as string;
  const { isLoading, isError, error, data } = useGetCategoryQuery<GetCategoryQuery, Error>(
    grahpqlRequestClient,
    { id },
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error {error.message}</p>;
  return (
    <>
      {data?.category?.reviews?.map((review) => (
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const id = context.query.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetCategoryQuery.getKey({ id }),
    useGetCategoryQuery.fetcher(grahpqlRequestClient, { id }),
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default CategoryPage;
