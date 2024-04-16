import { createMachine, assign } from 'xstate';
import { getService } from 'ember-statechart-component';

import type { GeoModel } from '../../handlers/geo-handler';
import { geoQuery } from 'dynamis/builders/geo-builder';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QENazrAtmAdgFwDEB7AJ0wDoAFIgS3wAJ0AbMAYzxqJwGIA5AUQAaAFQDaABgC6iUAAcisGhy4yQAD0QAmcQDZx5AMwAWAwFYAnHuOnTOowBoQAT0RGL5AIwAOAOymfxjoW4poAvqGOqOho2PjEZFS0DMxsyjjkAMpgyCSsABb0yBAQJBjkAMJ5bADW9LJ5JKhg3BLSSCDyimmqGgiaXh7k-R6aBuamIT6a-o4uCEY+RuTiXkZ2Y9PTqwbhkWgYsYSkFNR0eIxgLOyc6Vk5+YXFpWgVVay19Y3oLR5tcgpKG49LQDIYDUbjSbTHyzRAGAyaTwGDxGaYeXTmQI+XYgKIHXBHBKnZKXVI3TLZXIFIolMq8Ih1BpNbjCACalH4rVUnUBKnavWGYJGYwmmimM2cWgMOk8Pi8miCUy8BhWOhxeJiBPiJyS5xS1y4FPu1KeZQyRGwjK+zTZHK57R53X5IMGwwhovFMMlCAMcqRKNWpjWOgRRnV+01cWOiTOFyuaSNVMetJe5stn2ZGX4AEEAErlAAS9v+XSBzoQOkr5BMUyC5gCmnMvlh8xW5HMRg8Bi8tmRZjc4eiWC10eJetJBtuE-O8jOmQArgAjTBKDg4KD0ABmx24EC4YHIdAAbkRqgeNcOo0TdXGyYasvG6rqF8vV3QN9uyAhj0RWMg0q0xYdACTqgL06I+DK2zaIsQSmN4mgtt2PjkD4AbwZWtiaAqOwRLiEaXoSOqxvqCYPqkT5zhkS4rnga4fjue44AeP5nuQF6HNqMYkvG5LkewlH4C+tH0VuxzfjgJ5-gBUiiL83IgWWYGIBBUEmDBaw2AhLb+ChQQhh4OgeOY4hNr6g74lexE8XeU6PrOQnUa+dHvmJZDcGAJAkKQ5CyEw-6fhQHEjteJHTnx06CXgwlvuubmYBJUn-jcgFSAppZ8spCCqeQ0HiLBWnyi22H6EY5jlUYXjmNhOheKsFmRkR3Hjrx96RQ50XZqaaC3pO5AAJI4ICyBMNwWYADL8OUYhpQ6imZeoKn+IicE+D4HZipoCxeC2RhGPoPjiAi0r5YZUxhHhwVWc1vVke1z5dSmsC3eSY63ZAY38JN01AY6SmLdlkFeO25W1WtKomdhSGHUMCqmL60qrNM-gNYRXG5nA85MHg3CULm-AAGr9QA8gAqhkv3zTgwJ9Lo+jGGYlhHW4tgON6CqlbVqy6BMOj9F4ao4jgRAQHAqhXUR6W8tT5YALSoi28uIuIKuaB4Fig-0-So5xo43qR-1-QtvQ6LtpjVqD9YM5WZiC3sQ666FNl9XcSY0s88BzRlMtZUGLYBuQOhyl25XIZYhk6yF1ktbZiYPO7ZSVDUVpNFLoEA+iiHszDbiVQMKymGKpmR9db0G21xrJh75D0in6Bp-9vSVYiYziEGqI6JYCqm+zQfVnVhm1V2R0rCXTVl+FFdu91sCZBaYB12ADfG648qGCZ7cKl3la7aZ1adt2vZdkGQZj1xE+tXZFEdcvPsA+DQzGMzhkdos5j+wiINNqMXbIn49Znz1mFS+FJ7LPiciJVygVb403lDKUY+1jAvwWGVJCPZ2ydgPsqNE+U7b4QdlHG65cr4CQ6gNIaHARowPLPKV0T8kGdxQe-b0CIUJ7S7HKcQ3gAjykAU7GOLt7pzkeh7F6C0jZ33AiYQYrCbDKkMoXYqa9ax832mieE2JLoEUdtHMRJCZwPRnno8hw0mDUKyiidahgxRyOREELOcw1gGHbI2Tu+VOFVVMHw3RxDQHX0MU9YxF9UiQHMRnOUwNWG+A8CMBYR1dpoVlJYSwixDoYW8UQye+iorkH4F5UgYTwIqiWO4yscEgwmTZnMLaiIaqmCqpYPajZeFaIIaXfWWS-GkOfLXBOEZCkqU7OYIYQQYnaDKiiSwOlIKB1sN4EY391q4XtpZJqGNYBYzwAMvoxlhlqwFuiOqXDDLFU7ssQu+V+iQXMOhcI4QgA */
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
      on: {
        NEXT: 'Result',
      },

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

            Initial: {},

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
                  },
                },
              },

              initial: 'Initial',
            },

            Error: {},
            'No addresses': {},
          },

          initial: 'Initial',
        },
      },

      type: 'parallel',
    },

    Result: {
      on: {
        PREVIOUS: '#assessmentForm.Point selection',
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ret = (getService(context, 'dynamisStore') as any).request(
        geoQuery(context.searchPhrase),
      );
      // console.log('fetchSearchResults()', ret);
      return ret;
    },
  },
});

export default machine;
