import styled from '@emotion/styled';
import Link from 'next/link';

const NotFoundPage = () => {
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
