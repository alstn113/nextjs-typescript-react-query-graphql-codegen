import { GetServerSideProps, GetStaticProps } from 'next';

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Props {
  data: Data[];
}

function Test({ data }: Props) {
  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { data: Data[] };
}> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: Data[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

// export const getStaticProps: GetStaticProps = async (): Promise<{
//   props: { data: Data[] };
// }> => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data: Data[] = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

// Test.getInitialProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data: Data[] = await res.json();
//   return { data };
// };

export default Test;
