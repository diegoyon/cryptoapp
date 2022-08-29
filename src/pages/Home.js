import React from 'react';
import { useSelector } from 'react-redux';
import Asset from '../components/Asset';
import './Home.css';

function Home() {
  const assets = useSelector((state) => state.assets.assets);
  const status = useSelector((state) => state.assets.status);

  let content;
  if (status === 'loading') {
    content = <p>Loading</p>;
  }
  if (status === 'succeeded') {
    content = assets.map((asset) => (
      <Asset
        key={asset.id}
        symbol={asset.symbol}
        name={asset.name}
        priceUsd={asset.priceUsd}
      />
    ));
  }

  return (
    <div className="asset-list">{content}</div>
  );
}

export default Home;
