import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Asset from '../components/Asset';
import './Home.css';
import mic from '../img/mic.png';
import settings from '../img/settings.png';
import {
  sortHighPrice,
  sortLowPrice,
  sortGainers,
  sortLosers,
  sortTopRanked,
} from '../redux/Assets';

function Home() {
  const assets = useSelector((state) => state.assets.assets);
  const status = useSelector((state) => state.assets.status);
  const filter = useSelector((state) => state.assets.filter);
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    switch (e.target.value) {
      case 'top-ranked':
        dispatch(sortTopRanked());
        break;
      case 'high-price':
        dispatch(sortHighPrice());
        break;
      case 'low-price':
        dispatch(sortLowPrice());
        break;
      case 'gainers':
        dispatch(sortGainers());
        break;
      case 'losers':
        dispatch(sortLosers());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header>
        <select defaultValue={filter} onChange={handleChange}>
          <option value="top-ranked">top ranked</option>
          <option value="high-price">high price</option>
          <option value="low-price">low price</option>
          <option value="gainers">gainers</option>
          <option value="losers">losers</option>
        </select>
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
