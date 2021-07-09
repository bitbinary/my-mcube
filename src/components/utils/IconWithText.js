import React from 'react';
import AppTexts from './AppTexts';

export default function IconWithText({ icon, text }) {
  return (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      <AppTexts content={text} />
    </span>
  );
}
