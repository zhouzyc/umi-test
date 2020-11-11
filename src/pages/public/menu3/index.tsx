import React,{ useState, useEffect } from 'react';
import { isLogin } from '@/services';

export default ()=> {

  const [loading, setLoading] = useState<boolean>(false);

  const activateLasers = async ()=>{
    throw new Error('I crashed!');
  };

  if (loading) {
    // Simulate a JS error
  }
  return (
    <>
      <button onClick={activateLasers}>
        点我报错1111
      </button>
    </>
  );
};

