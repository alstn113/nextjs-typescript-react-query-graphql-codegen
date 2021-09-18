import { useRouter } from 'next/dist/client/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';

import { GetCategoryQuery, useGetCategoriesQuery, useGetCategoryQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import ReviewCardComponent from '@/components/Review/ReviewCard';

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
          <ReviewCardComponent review={review} />
        </div>
      ))}
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
    useGetCategoryQuery.getKey({ id }),
    useGetCategoryQuery.fetcher(grahpqlRequestClient, { id }),
  );

  const data = queryClient.getQueryData(useGetCategoryQuery.getKey({ id }));
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
  const data: { categories: { id: string }[] } = await grahpqlRequestClient.request(
    useGetCategoriesQuery.document,
  );

  const paths = data?.categories?.map((category) => {
    return {
      params: {
        id: category.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export default CategoryPage;
