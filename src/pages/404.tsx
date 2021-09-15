import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 4000);
  }, []);
  return (
    <NotFound>
      <h1>NOT FOUND</h1>
      <h3>
        <Link href="/">
          <a>GO TO HOME</a>
        </Link>
      </h3>
    </NotFound>
  );
};

export default NotFoundPage;

const NotFound = styled('div')`
  text-align: center;
  margin-top: 100px;

  ${({ theme }) => theme.font.xlarge}
`;
