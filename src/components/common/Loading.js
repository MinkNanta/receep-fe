import React from "react";

export default function Loading() {
  // const [load, setLoad] = useState(false);
  // {load && <Loading />}
  return (
    <div className='bg-white absolute inset-0 z-50 h-full'>
      <div class='spinner m-auto h-full w-full'></div>
    </div>
  );
}
