import React from 'react';
import { useOutlet } from 'react-router';

const TestPage = () => {
  const outlet = useOutlet();
  return (
    <React.Fragment>
      <p>cxvcxv</p>
      {outlet}
      <p>cxvcxv</p>
    </React.Fragment>
  );
};
export default TestPage;
