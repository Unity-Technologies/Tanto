import React from 'react'
import { storiesOf } from '@kadira/storybook'

import 'babel-polyfill'

import storeMock from 'tests/mocks/storeMock'

import { Provider } from 'react-redux'

import Builds from './index.js'

const store = storeMock({
  entities: {
    builds: {
      1: {
        id: '55550',
        number: 25,
        result: 0,
        finish: null,
        start: '2017-03-27T07:57:06.886273+00:00',
        buildTime: 3650.19778513908,
        builder: {
          friendlyName: 'Test IntegrationTests - Mac (Weekly Suite) (Editor Only)',
          name: 'proj0-Test IntegrationTests - Mac (Weekly Suite) (Editor Only)',
          project: 'Unity',
        },
      },

      2: {
        id: '55687',
        number: 57,
        result: 1,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      3: {
        id: '55687',
        number: 57,
        result: 2,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      4: {
        id: '55687',
        number: 57,
        result: 3,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      5: {
        id: '55687',
        number: 57,
        result: 4,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      6: {
        id: '55687',
        number: 57,
        result: 5,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      7: {
        id: '55687',
        number: 57,
        result: 6,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      8: {
        id: '55687',
        number: 57,
        result: 7,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      9: {
        id: '55687',
        number: 57,
        result: 8,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',
        },
      },
      11: {
        id: '55687',
        number: 57,
        result: 11,
        finish: null,
        start: '2017-03-27T17:37:01.589323+00:00',
        buildTime: 4601.4323580265,
        builder: {
          friendlyName: 'Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          name: 'proj0-Test GraphicsTests - MetroPlayerBlue DX11 9.1',
          project: 'Unity',

        },
      },
    },
    sourceStamps: {
      a8be7b8fcec0e2146ad43194a9d8fee2c8479c08: {
        id: '187',
        revision: 'a8be7b8fcec0e2146ad43194a9d8fee2c8479c08',
        builds: {
          total: 69,
          nodes: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 11,
          ],
        },
      },
    },
  },
})

storiesOf('Builds', module)
  .addDecorator((getStory) => (<Provider store={store}>
    {getStory()}
  </Provider>
  ))
  .add('default', () => (
    <Builds repository={'all-unity'} revision={'a8be7b8fcec0e2146ad43194a9d8fee2c8479c08'} />
  ))
