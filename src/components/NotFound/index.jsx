import React from 'react';

const NotFound = ({location}) => (
  <div>
    <h1>Page Not Found</h1>
    <p>You are looking for {location.pathname} but that does not seem to exist</p>
  </div>
);
export default NotFound;
