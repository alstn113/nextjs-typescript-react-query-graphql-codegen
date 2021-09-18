import HeaderComponent from '@/components/Layout/Header';
import { ReactChild } from 'react';

interface Props {
  children: ReactChild;
}

function LayoutComponent(props: Props) {
  return (
    <>
      <HeaderComponent />
      <main>{props.children}</main>
    </>
  );
}

export default LayoutComponent;
