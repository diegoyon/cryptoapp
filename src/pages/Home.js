import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const assets = useSelector((state) => state.assets.assets)
  const status = useSelector((state) => state.assets.status)

  let content;
  if(status === 'loading'){
    content = <p>Loading</p>
  }
  if (status === 'succeeded'){
    content = assets.map((asset) => (
      <div key={asset.id}>
        <p>{asset.id}</p>
        <p>{asset.rank}</p>
      </div>
    ))
  }

  return (
    <div>{content}</div>
  );
}

export default Home;
