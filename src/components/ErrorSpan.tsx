import React, { ReactFragment } from 'react';

function ErrorSpan({ children }: { children: ReactFragment }) {
  return (
    <span style={{ fontSize: '.875em', fontWeight: 300, color: 'red' }}>
      {children}
    </span>
  );
}

export default ErrorSpan;
