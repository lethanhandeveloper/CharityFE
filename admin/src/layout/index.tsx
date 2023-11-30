import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useOutlet } from 'react-router';
import AlertSnackbar from '@components/SnackBar';

const MainLayout = () => {
  const children = useOutlet();
  return (
    <React.Fragment>
      <Header />
      <div style={{ marginTop: '80px' }}> {children}</div>
      <AlertSnackbar />
      <Footer />
    </React.Fragment>
  );
};
export default MainLayout;
