import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Asset from '../components/Asset';
import './Home.css';
import mic from '../img/mic.png';
import settings from '../img/settings.png';

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
        <div className="images">
          <img src={mic} alt="microphone" />
          <img src={settings} alt="settings" />
        </div>
      </header>
      <div className="asset-list">{content}</div>
    </>
  );
}

export default Home;
