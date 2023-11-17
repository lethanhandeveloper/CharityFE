import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useOutlet } from 'react-router';

const MainLayout = () => {
  const children = useOutlet();
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
export default MainLayout;
