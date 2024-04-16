import { createMachine, assign } from 'xstate';
import { getService } from 'ember-statechart-component';

import type { GeoModel } from '../../handlers/geo-handler';
import { geoQuery } from 'dynamis/builders/geo-builder';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QENazrAtmAdgFwDEB7AJ0wDoBlMZEgYwAsACZCCEjcgYQbDoGsmABwYlUYAMQBtAAwBdRKCFFYASzyqiORSAAeiAEwBWAIzkDADhMGAbDZkBmEwBYbJowHYANCACeiIwBOQPJnGRsHD0CLGUDnJw8AX0SfVHQ0bHxiMioaemZWdk4ePkERMXRpEwUkEGU1DS0dfQRjM0trO0cXN08ffwRnT1CjB2NAxw8TD2dA5NS0DEzCUgpqWkYWNg40cgA5ImFRcQkAFQBNAAUAUVkapRV1TW1alrbzK1t7J1d3bz9EA43OQjDIZNYTJFnB4LE55iA0ktcCscut8lsirtKERsEcKpILjc7jp6k8mq9DKYPp1vj0-v0Ao4RmNnAYXB5HNF4YiMsjsms8ptCjtYFQcWA8SdKNcAIIAJS4AAlibVSY0XqAWhEbKFIqM2VEjEZ4gyEKNnOYIiY3NEXNMDNzFrysqtcgAbPh4YREVT4KgAVwARph1BocFAmAAzVYSCBaMDkX0ANyI-ATPKwfNd1A9dC9yl9eADwdDvoj0bICGTRDoyHVdxVDwaz2aiBMMlc5As8QsBkCQUCNkC1lNpgc5EcdjCNhhdjijvSmZdqLAufzPr9lCDIbwYfLMbjOAT1bT5Azy357s93sLxZ3e6jqyrOBTtfr8ik1RJj3VrYQ7c7bsHF7ftgiHEcAQQDkDHIQIPCiSEZFGKc5hSBEnSXFEBTXG9N23Utw0fMgJDAEgSFIcghDdOsKwoc8sxXHCCzwktdzLIjMGfV862eBt5G-ZtyU1NsOx1ICQIHcCDFNBwhi7Nk7CMIchnsJI0Po5dsOvZiixlbYMCYdA12ecgAEkcCeZA3QkaUABlri4U5GzqH8Wwpf9jRgmwlMieDZkCJwLFHOwJwMZwLBiaxTHBGwFyRTSrzzXDdP0tBDNXT0TMuDcvSMz1IBs657Mc5y1Tc4T-w8BwQjBcFqrgsILA8IxTVmIwQXC2SDAMJDmua5w4udLCqDoDhcHIPTMVgdKNgYCQ9muAANJz+NVVyhL0SkZAnExrAMZr+3iSJTXbHVZhkWwxkhVwjDCwbMMvShRrAca5Tgf03TwCRLjla4ADVTIAeQAVUoUr1o1TbWlBHa9oO40HGOyCjVgiYTDgjtZng7rkjQnAiAgOAdA0rCBLJSGWgAWjC01Kd2mrYhiGJvKNWwjHui9s0FApUvgNbBIpwxnFNfaLVq2JLAu6rbo5hiBVmjERW4XgBEldAyd-dyPGkyDpfIeC50sGxbAsTxYvUjDOZXBXhU4A41bADXyqhoYYOq8JnGhYdbqimTAhgqxapcWEXDg2WErRIVebFXFynEJ2NpaV3yHdmxPYQn3jFHWT9atbrjGND3w+GnNtJyhPBag+JzFk5x3GiDwbFhQIRaMCwU4UyI9vtWFi8ejKkp0u8CP3MgK7-KIdQMWv66apvqtHXbLScNkZEbgKZj7rmmJysyLI0Kzx614ca892fG+b1rbtzq7gOsWZLAGi3FytrTB93yaRXS4yNrKxO2zCGYMYvZaqzF2ojVqMh24dhDkCRGQIw7P3iiXAe65byfwMnlPMJlzKWTdEfCqLhZgdxAWCMBkIHCjgsCENodc27ayQg4dmSChr9x3ug3m39MpaHINlQsXC8yQAIVDaYbcSGi2lk3fso5BwgnBF7CwTdQ4OC3oxMut5rhkVIMIlo1gZgThhA4DsiN7CDhkjODqvZbDa0RujeIqi35oL9PbW2TodFtmAjQ7y8FBzdg7FA00HIzBwUivBJqsxZIOJGmNSGf9K59hBNQxGq8iFN3+AMSmTg5FwSiBE600JTZRKejEianD0CzXcVBDwiSApXXka4JqppjYGKYTOahnJhwqJYQ9bMz1XrvU+pU4C7cIo2luhyIYEEBhpxBFVJSMIJj1UhLjRIQA */
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

            SEARCH: '#assessmentForm.Select point.Submitting form',
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

    Screen: {
      states: {
        'Address search': {
          on: {
            NEXT: 'Result',
          },
        },

        Result: {
          on: {
            PREVIOUS: 'Address search',
          },
        },
      },

      initial: 'Address search',
    },
  },

  type: 'parallel',
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
