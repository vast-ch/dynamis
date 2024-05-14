import { createMachine, assign } from 'xstate';
import { getService } from 'ember-statechart-component';

import type { GeoModel } from '../../handlers/geo-handler';
import { geoQuery } from 'dynamis/builders/geo-builder';
import { assessmentQuery } from 'dynamis/builders/assessment-builder';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QENazrAtmAdgFwDEB7AJ0wDoAFIgS3wAJ0AbMAYzxqJ3IGUxkSrABb1kECCQzkAwkLYBregAchJVGADEAbQAMAXUSglRWDQ5dDIAB6IATAA4AjOQePbAZgCcAVh22A7Lbe-gA0IACeiAAs-lHkOvZRAGxRXkFBie4AvllhqOho2PjEZFS0DMxs5tx8AsKi4pJoMnKsiipq6NqOBkggxqbVljYIri5OHj5+gcFhkQju7rbkju6OUUGOOkme7sn+OXloGEWEpBTUdHiMYCzsnDX8giJiElIAckTKquoaACoATUoAFFdL0jCYzA9hnYnOM3F5fAEgqEInZ3EkVv57LYksEHO4EklDiB8idcGdSpcKrcqg9eE96q8mrBeERsN9OppASCwZYBlCLH0RmNXJMkTNUfN3NiVmsoolvMkkksoiSyYUKSULuVrpV7lwGXUXo0pDx2WBOb8eMCAIIAJWkAAk+X0BUNhYgkt7yKlAnjPP4lp57FLoglyJ4oqt7N4Vasld51cdNcVzmUrjc7tUGdnlLreABXABGmDMHBwUHoADNzhoIFwwOQ6AA3IjyJsarBa9PUvW0g2PPPGK5F0vluhV2tkBCtoisZDVMGuiGDaGehBbfyYzK2HSxPHeRw4uaIdyh8j+daxxzeuO2XHZXKklPdtNU3VZumGvjDgs8EsyzwCspzrBscCbOcO3ILtTm1DMaWzelfyqfNRwA8dgMnGtzlnHA2wXJd9C0Hp+UhD1QBGLcd1SPcD28I8TzRBBgn8cg8XjJJHE8HQQxlZMCjfSkdUzfUcxQ9g0PwMcgJAnCyA0MASBIUhyCUJhF2nChYJ7D9RIHcSDKkvAZInSt5MwPCCMXB5l30Mi1yFSjEGo8hd33ZIGOPWxT1GPdfU8QKFU8B8knsRIBPJd8RMQ78h1QkdpNtU00C-QdyAASRwKFkCYDQbQAGWBaQ-hXfpyPXZzN28QLIyVBwdFYpxHDDBBo3cS9ePPRxgn3QlHEi1NhIQ-skJ-IzEpM5K3lSsT6T7NK8EgfLgSKkqyvdSrrBc-xPExWwQ2PcKnGVXy9g6jxcRxewkliew9iTZ8dOikbFuQiaC2mlk3sNBaxOW95gQADVK+y3Qqpztr8oN4ivZIZVvbF9181JMV2bx7qSAI4aDYkntfOD01tAmKXoCAaFgdTkHCDRKHtYEADUMoAeQAVR4DaIZwGFRhazEuJ62IAhu-xtl8nr7AC1x-F28LbzjQahPg4nBNOGswDwYRJ3rRtm3w9tOxJl6Vai65qw1rXKys+cbK4OzwXKxzuY3WwoiiTwVgme643Cvakl8ujyC81YuMfJYAkVwnShNob1c1oRtaUlSSDUjS8C0mCjeGmOhLjy2oGtwjbOIsHV0FZ2qsmSXeJSex9zcQL7F8mrln6zyYldxqDhJHAiAgOBLGe4SHPLnmAFoNl8ie2NvTw3FxDx3e4t3I90mLRrikeKKh-3mKiHRyEWBIZZlPEEkavGjlVtfXrm8bjQaGb4HBp2eaVcWFXY7FcXxe6iVXl6f0DLvQfsyKQsgFBWnQFvLaVE-AB1Fr6JUcsEjeACLxABw0gFjUeKAlKrJPhQLADAyGIwFStx4kqDYOwsbegDrdX0ctvROEJISewmD4LYLikaZ4j8WRsg5B0dQJCK5Q3IYfShbtcR7VxLveY+8PZuxjHGNY7hExqnxtfQBn477xUkpNERPMZbOG4oEHie0nBKkcOLAIbk2En23L4Oul8XxaKwTo4B40-zoUAmZUCZBDEbhxPtPYOg9izxiO7M6sZIzRnavdTY+4XFD04R4nBuYEqfXwT9URm1SEuSiBjdiuJGpRlugkKIAcGKXiWGFBwt0FQPQ4b2NJ3CJLXEmuQL6GAcmZWyhwXKgSqo9W2MUpIpT9gVJRhiSMajMbY3WLjZpelYrpXacZLp2TdG3wMpAIZUNjw9TGTKB8-g0G3RRm7T2GMNiuy4rxR6V9TapP0uk9ZnTgTKVIPsqihI4j7m3HeBi7sdCVOYq7ZYoUMaBRSBsEMthlnr16e8gshCwEph+QU7iLg8SODcKCue7s5GIGCPzOMhyDo4l2k+J5Q0XmrMMt46SWUcpMH2XgIgSg7BHKPqGIMjjz67xYNWPAiAnAe1MQdGuljoxhGLEQYC7I7AqkPvY-lZ9nFhBIDQKAQhRUIF2BKwMUqLE9VlSAAA7jQCAeAhAuT3GEOQOq9XRCblDcVKxjXmLCma6x4KeVqtPk47YiKulZzJhTKm8wy7bxFMkOI3UHwxDjIUvEvkLzRl9txLYYVRYIs0c8om4bzbx0nJi0YhTnDjMCO7e6mM3XSj2pGVBMppiGqCDkHIQA */
  context: {
    searchPhrase: undefined,
    searchResults: [],
    selectedPoint: undefined,
  },

  schema: {
    context: {} as {
      searchPhrase: string | undefined;
      searchResults: Array<GeoModel>;
      selectedPoint: GeoModel | undefined;
    },
  },

  id: 'assessmentForm',

  states: {
    'Point selection': {
      states: {
        'Search address': {
          initial: 'Check phrase',

          states: {
            'Check phrase': {
              always: [
                {
                  target: 'Some phrase',
                  cond: 'isPhraseEntered',
                },
                'No phrase',
              ],
            },

            'No phrase': {
              on: {
                TYPE: {
                  target: 'Check phrase',
                  actions: 'updateSearchPhrase',
                },
              },
            },

            'Some phrase': {
              on: {
                TYPE: {
                  target: 'Check phrase',
                  actions: 'updateSearchPhrase',
                },

                SEARCH:
                  '#assessmentForm.Point selection.Select point.Submitting form',
              },
            },
          },
        },

        'Select point': {
          states: {
            'Submitting form': {
              invoke: {
                onDone: [
                  {
                    target: 'Address selection',

                    actions: [
                      {
                        type: 'updateSearchResults',
                      },
                    ],

                    cond: 'hasAddressess',
                  },
                  'No addresses',
                ],
                onError: {
                  target: 'Error',
                  actions: {
                    type: 'updateError',
                  },
                },
                src: 'fetchSearchResults',
              },
            },

            'Address selection': {
              states: {
                Initial: {
                  on: {
                    SELECT: {
                      target: 'Point selected',
                      actions: 'updateSelectedPoint',
                    },
                  },
                },

                'Point selected': {
                  on: {
                    SELECT: {
                      target: 'Point selected',
                      internal: true,
                      actions: 'updateSelectedPoint',
                    },

                    NEXT: '#assessmentForm.Assessment fetching',
                  },
                },
              },

              initial: 'Initial',
            },

            Error: {},
            'No addresses': {},
            Initial: {},
          },

          initial: 'Initial',
        },
      },

      type: 'parallel',
    },

    'Assessment display': {
      on: {
        PREVIOUS:
          'Point selection.Select point.Address selection.Point selected',
      },
    },

    'Assessment fetching': {
      invoke: {
        src: 'fetchAssessment',

        onDone: {
          target: '#assessmentForm.Assessment display',
          actions: 'updateAssessment',
          cond: 'New guard',
        },

        onError:
          'Point selection.Select point.Address selection.Point selected',
      },
    },
  },

  initial: 'Point selection',
}).withConfig({
  actions: {
    updateSearchPhrase: assign({
      searchPhrase: (context, event) => {
        return event['address'];
      },
    }),
    updateSearchResults: assign({
      searchResults: (context, event) => {
        return event['data'].content;
      },
    }),
    updateError: function () {
      console.log('TODO error');
    },
    updateSelectedPoint: assign({
      selectedPoint: (_, event) => {
        return event['point'];
      },
    }),
  },
  guards: {
    isPhraseEntered: function (context) {
      return !!context.searchPhrase;
    },
    hasAddressess: (context, event) => {
      return event['data'].content.length > 0;
    },
  },
  services: {
    fetchSearchResults: (context) => {
      console.log(geoQuery(context.searchPhrase));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ret = (getService(context, 'dynamisStore') as any).request(
        geoQuery(context.searchPhrase),
      );
      // console.log('fetchSearchResults()', ret);
      return ret;
    },
    fetchAssessment: (context) => {
      console.log({ context });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ret = (getService(context, 'dynamisStore') as any).request(
        assessmentQuery(context?.selectedPoint?.id), // TODO
      );
      console.log({ ret });
      return ret;
    },
  },
});

export default machine;
