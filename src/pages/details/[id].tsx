import { GetReviewQuery, useGetReviewQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import { useRouter } from 'next/dist/client/router';

const ReviewDetailsPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { isLoading, isError, error, data } = useGetReviewQuery<GetReviewQuery, Error>(
    grahpqlRequestClient,
    { id: id as string },
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

export default ReviewDetailsPage;
