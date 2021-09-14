import { GetCategoriesQuery, useGetCategoriesQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import Link from 'next/link';

const HeaderComponent = () => {
  const { isLoading, isError, error, data } = useGetCategoriesQuery<GetCategoriesQuery, Error>(
    grahpqlRequestClient,
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error {error.message}</p>;
  return (
    <>
      <div>
        <Link href="/">
          <a>
            <h1>Minsoo Reviews</h1>
          </a>
        </Link>
        <nav>
          <span>Filter reviews by categories : </span>
          {data?.categories?.map((category) => (
            <Link key={category?.id} href={`/category/${category?.id}`}>
              <a> {category?.name}</a>
            </Link>
          ))}
          <div>
            <Link href="/create">
              <a>Create Review</a>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HeaderComponent;
