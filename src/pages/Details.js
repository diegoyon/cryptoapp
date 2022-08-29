import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Details.css';

function Details() {
  const params = useParams();
  const assets = useSelector((state) => state.assets.assets);

  const assetArray = assets.filter((asset) => asset.id === params.id);
  const asset = assetArray[0];

  return (
    <>
      <p>
        {asset.name}
        -stats
      </p>
      <div className="title">
        <h1>{asset.symbol}</h1>
        <div className="title-details">
          <h2>
            #
            {asset.rank}
          </h2>
          <p>{asset.name.toUpperCase()}</p>
        </div>
      </div>
      <p>{asset.changePercent24Hr}</p>
      <p>{asset.name}</p>
      <p>{asset.priceUsd}</p>
      <p>{asset.rank}</p>
      <p>{asset.marketCapUsd}</p>
    </>
  );
}

export default Details;
