import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>NOT FOUND</h1>
      <h3>
        <Link href="/">
          <a>GO TO HOME</a>
        </Link>
      </h3>
    </div>
  );
};

export default NotFound;
