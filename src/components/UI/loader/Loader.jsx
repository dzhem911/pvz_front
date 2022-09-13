import React from 'react';
import loaderStyle from './loader.module.css'

const Loader = () => {
  return (
    <div className={loaderStyle.wrapper}>
      <div className={loaderStyle.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;