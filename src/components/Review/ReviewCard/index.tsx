import Link from 'next/link';
import { GetReviewQuery } from '@/generated/graphql';
import styled from '@emotion/styled';

function ReviewCardComponent({ review }: GetReviewQuery) {
  return (
    <ReviewCard>
      <div className="rating">{review?.rating}</div>
      <h2>{review?.title}</h2>
      {review?.categories?.map((c) => (
        <small key={c?.id}>{c?.name}</small>
      ))}
      <p>{review?.body.substring(0, 100)}</p>
      <Link
        href={{
          pathname: '/details/[id]',
          query: { id: review?.id },
        }}
      >
        <a>Read More</a>
      </Link>
    </ReviewCard>
  );
}

export default ReviewCardComponent;

const ReviewCard = styled('div')`
  background: white;
  margin: 60px auto;
  padding: 1px 20px 20px 90px;
  position: relative;
  box-shadow: 2px 2px 2px blueviolet;
  .rating {
    position: absolute;
    ${({ theme }) => theme.flexCenter}
    top: -20px;
    left: -20px;
    background: #8e2ad6;
    font-size: 3em;
    width: 90px;
    height: 90px;
    text-align: center;
    color: white;
    box-shadow: 2px 2px 2px rgb(186, 158, 212);
  }
  h2 {
    ${({ theme }) => theme.font.large}
    margin-bottom: 10px;
  }
  small {
    margin-right: 10px;
    color: #777;
  }
`;
