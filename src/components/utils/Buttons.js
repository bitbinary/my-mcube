import React from 'react';
import { Button } from 'antd';

export default function Buttons({
  className,
  size = 'medium',
  type = '',
  content = '',
  rest,
}) {
  return (
    <div className='app-button'>
      <Button {...rest} className={className} type={type} size={size}>
        {content}
      </Button>
    </div>
  );
}
