import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import PortalProvider from '../app/components/blocks/portal/PortalProvider';
import Body from '../app/components/Body';
import { configureStore } from '../app/store';
import { types } from '../app/store/globalStore';

describe('Body tests', () => {
  const store = configureStore({});

  test('triggers API calls', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');

    renderer.create(
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>,
    );

    expect(storeSpy).toHaveBeenCalledWith(expect.objectContaining({ type: types.GB_GET_DEPLOYMENT_DATA }));
  });
});
