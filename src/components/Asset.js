import React from 'react';
import PropTypes from 'prop-types';
import './Asset.css';

function Asset(props) {
  const { symbol, name, priceUsd } = props;
  let price;
  if (priceUsd > 10) {
    price = parseFloat(priceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    price = Number(parseFloat(priceUsd).toFixed(5));
  }
  return (
    <div className="asset">
      <h1 data-testid="symbol">{symbol}</h1>
      <div className="basic-detail">
        <h2 data-testid="name">{name.toUpperCase()}</h2>
        <p>
          $
          {price}
        </p>
      </div>
    </div>
  );
}

Asset.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priceUsd: PropTypes.string.isRequired,
};

export default Asset;
