import { GetCategoryQuery, useGetCategoryQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, error, data } = useGetCategoryQuery<GetCategoryQuery, Error>(
    grahpqlRequestClient,
    { id: id as string },
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

export default CategoryPage;
