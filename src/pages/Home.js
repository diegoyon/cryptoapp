import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <Link key={asset.id} to={`/${asset.id}`}>
        <Asset
          symbol={asset.symbol}
          name={asset.name}
          priceUsd={asset.priceUsd}
        />
      </Link>
    ));
  }

  return (
    <>
      <header>
        <h1>top rated</h1>
      </header>
      <div className="asset-list">{content}</div>
    </>
  );
}

export default Home;
