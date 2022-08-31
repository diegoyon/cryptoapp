import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import renderer from 'react-test-renderer';
import Asset from '../Asset';

describe(Asset, () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Asset
          symbol="BTC"
          name="Bitcoin"
          priceUsd="20000"
        />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('asset displays correct name', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Asset
          symbol="BTC"
          name="Bitcoin"
          priceUsd="20000"
        />
      </Provider>,
    );
    const assetName = getByTestId('name').textContent;
    expect(assetName).toBe('BITCOIN');
  });

  it('asset displays correct symbol', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Asset
          symbol="BTC"
          name="Bitcoin"
          priceUsd="20000"
        />
      </Provider>,
    );
    const assetSymbol = getByTestId('symbol').textContent;
    expect(assetSymbol).toBe('BTC');
  });
});
