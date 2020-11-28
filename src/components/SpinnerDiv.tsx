import React from 'react';
import { Spinner } from 'reactstrap';

function SpinnerDiv() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '20em',
        width: '100%'
      }}
    >
      <Spinner
        color="primary"
        style={{
          height: '8em',
          width: '8em'
        }}
      />
    </div>
  );
}

export default SpinnerDiv;
