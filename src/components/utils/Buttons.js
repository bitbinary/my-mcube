import React from 'react';
import { Button } from 'antd';

export default function Buttons({
  className,
  size = 'medium',
  type = '',
  content = '',
  handleClick,
  ...rest
}) {
  return (
    <div className='app-button'>
      <Button
        {...rest}
        onClick={handleClick}
        className={className}
        type={type}
        size={size}
      >
        {content}
      </Button>
    </div>
  );
}
