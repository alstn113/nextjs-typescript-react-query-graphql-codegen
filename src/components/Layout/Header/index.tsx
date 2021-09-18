import { GetCategoriesQuery, useGetCategoriesQuery } from '@/generated/graphql';
import grahpqlRequestClient from '@/lib/clients/graphqlRequestClient';
import styled from '@emotion/styled';
import Link from 'next/link';

const HeaderComponent = () => {
  const { isLoading, isError, error, data } = useGetCategoriesQuery<GetCategoriesQuery, Error>(
    grahpqlRequestClient,
  );

  return (
    <>
      <div>
        <Header>
          <Link href="/">
            <a>Minsoo Reviews</a>
          </Link>
        </Header>
        <Nav>
          <span>Filter reviews by categories : </span>
          {isLoading
            ? `Loading...`
            : isError && error
            ? `Error ${error.message}`
            : data?.categories?.map((category) => (
                <Link
                  key={category?.id}
                  href={{
                    pathname: '/category/[id]',
                    query: { id: category?.id },
                  }}
                >
                  <a> {category?.name}</a>
                </Link>
              ))}
        </Nav>
      </div>
    </>
  );
};

export default HeaderComponent;

const Header = styled('header')`
  ${({ theme }) => theme.font.xlarge}
  color: ${({ theme }) => theme.color.dark_violet2};
  padding-bottom: 10px;
  a {
    border-bottom: 2px solid;
  }
  margin-bottom: 10px;
`;

const Nav = styled('nav')`
  span {
    text-align: right;
  }
  a {
    margin-left: 10px;
  }
`;
