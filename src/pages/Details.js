import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAssetHistory } from '../redux/Assets';
import LineChart from '../components/LineChart';
import './Details.css';
import globe from '../img/globe.jpg';
import greenArrow from '../img/green-arrow.png';
import redArrow from '../img/red-arrow.png';
import backArrow from '../img/back.png';

function Details() {
  const params = useParams();
  const assets = useSelector((state) => state.assets.assets);
  const assetHistory = useSelector((state) => state.assets.assetHistory);
  const status = useSelector((state) => state.assets.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssetHistory(params.id));
  }, []);

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

  const isPositive = (num) => {
    if (num > 0) {
      return true;
    }
    return false;
  };

  let assetData;
  let content;
  if (status === 'loading') {
    content = 'Loading...';
  } else if (status === 'succeeded') {
    assetData = {
      labels: assetHistory.map((data) => data.date.substring(0, 10)),
      datasets: [
        {
          label: `${asset.name} History`,
          data: assetHistory.map((data) => data.priceUsd),
          backgroundColor: 'white',
          borderColor: 'white',
        },
      ],
    };
    content = <LineChart chartData={assetData} />;
  }

  return (
    <>
      <header>
        <Link to="/">
          <img src={backArrow} alt="back-arrow" />
        </Link>
        <h2>{asset.name}</h2>
      </header>
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
            <p>PERCENTAGE CHANGE (Last 24 hours)</p>
            <div className="change-percentage">
              <p className={isPositive(asset.changePercent24Hr) ? 'green' : 'red'}>
                {formatNumber(asset.changePercent24Hr)}
                %
              </p>
              <img src={isPositive(asset.changePercent24Hr) ? greenArrow : redArrow} alt="arrow" />
            </div>
          </div>
        </div>
        <div className="fourth-row">
          <div>
            <p>VWAP (Last 24 hours)</p>
            <p>{formatNumber(asset.vwap24Hr)}</p>
          </div>
          <div>
            <p>EXPLORE</p>
            <a href={asset.explorer}>
              <img src={globe} alt="globe" />
            </a>
          </div>
        </div>
        <div className="chart">{content}</div>
      </div>
    </>
  );
}

export default Details;
