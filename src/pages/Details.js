import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Details.css';
import globe from '../img/globe.jpg';

function Details() {
  const params = useParams();
  const assets = useSelector((state) => state.assets.assets);

  const assetArray = assets.filter((asset) => asset.id === params.id);
  const asset = assetArray[0];

  const formatNumber = (num) => parseFloat(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let price;
  if (asset.priceUsd > 10) {
    price = formatNumber(asset.priceUsd);
  } else {
    price = Number(parseFloat(asset.priceUsd).toFixed(5));
  }

  return (
    <>
      <p>
        {asset.name}
        -stats
      </p>
      <div className="title">
        <h1>{asset.symbol}</h1>
        <div className="title-details">
          <h2>{asset.name.toUpperCase()}</h2>
          <h3>
            #
            {asset.rank}
          </h3>
          <h4>Ranked</h4>
        </div>
      </div>
      <div className="stats">STATS</div>
      <div className="rows">
        <div className="first-row">
          <p>CURRENT PRICE</p>
          <p>
            $
            {price}
          </p>
        </div>
        <div className="second-row">
          <div>
            <p>SUPPLY</p>
            <p>{formatNumber(asset.supply)}</p>
          </div>
          <div>
            <p>MARKET CAP</p>
            <p>
              $
              {formatNumber(asset.marketCapUsd)}
            </p>
          </div>
        </div>
        <div className="third-row">
          <div>
            <p>VOLUME (Last 24 hours)</p>
            <p>{formatNumber(asset.volumeUsd24Hr)}</p>
          </div>
          <div>
            <p>CHANGE PERCENTAGE (Last 24 hours)</p>
            <p>
              {formatNumber(asset.changePercent24Hr)}
              %
            </p>
          </div>
        </div>
        <div className="fourth-row">
          <div>
            <p>VWAP (Last 24 hours)</p>
            <p>{formatNumber(asset.vwap24Hr)}</p>
          </div>
          <div>
            <a href={asset.explorer}>
              <img src={globe} alt="globe" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
