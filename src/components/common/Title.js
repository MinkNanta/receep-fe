import React from "react";

export default function Title({ title, sub, titleColor }) {
  return (
    <>
      <h1 className='title'>
        {title}
        <span className='text-main-400'>{titleColor}</span>
      </h1>
      <p className='subTitle'>{sub}</p>
    </>
  );
}
