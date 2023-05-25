import React from 'react';

export default function Loader() {
  return (<div className=' fixed top-0 w-full z-20 grid place-items-center h-screen bg-[rgba(0,0,0,0.6)] overflow-hidden '>
    <div className=' w-48 h-48 border-t-4 border-r-4 border-white rounded-full animate-spin bg-transparent ' >
    </div>
  </div>);
};
