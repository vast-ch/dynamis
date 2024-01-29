import { createMachine, assign, raise } from 'xstate';
import { getService } from 'ember-statechart-component';
import { geoQuery } from 'dynamis/builders/geo-builder';
import type { GeoModel } from 'dynamis/handlers/geo-handler';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QENazrAtmAdgFwDEB7AJ0wDoBlMZEgYwAsACZCCEjcgYQbDoGsmABwYlUYAMQBtAAwBdRKCFFYASzyqiORSAAeiAEwBWAIzkDADhMGAbDZkBmEwBYbJowHYANCACeiIwBOQPJnGRsHD0CLGUDnJw8AX0SfVHQ0bHxiMioaemZWdk4ePkERMXRpEwUkEGU1DS0dfQRjM0trO0cXN08ffwRnT1CjB2NAxw8TD2dA5NS0DEzCUgpqWkYWNg40cgA5ImFRcQkAFQBNAAUAUVkapRV1TW1alrbzK1t7J1d3bz9EA43OQjDIZNYTJFnB4LE55iA0ktcCscut8lsirtKERsEcKpILjc7jp6k8mq9DKYPp1vj0-v0Ao4RmNnAYXB5HNF4YiMsjsms8ptCjtYFQcWA8SdKNcAIIAJS4AAlibVSY0XqAWhEbKFIqM2VEjEZ4gyEKNnOYIiY3NEXNMDNzFrysqtcgAbPh4YREVT4KgAVwARph1BocFAmAAzVYSCBaMDkX0ANyI-ATPKwfNd1A9dC9yl9eADwdDvoj0bICGTRDoyHVdxVDwaz2aiBMMlc5As8QsBkCQUCNkC1lNpgc5EcdjCNhhdjijvSmZdqLAufzPr9lCDIbwYfLMbjOAT1bT5Azy357s93sLxZ3e6jqyrOBTtfr8ik1RJj3VrYQ7c7bsHF7ftgiHEcAQQDkDHIQIPCiSEZFGKc5hSBEnSXFEBTXG9N23Utw0fMgJDAEgSFIcghDdOsKwoc8sxXHCCzwktdzLIjMGfV862eBt5G-ZtyU1NsOx1ICQIHcCDFNBwhi7Nk7CMIchnsJI0Po5dsOvZiixlbYMCYdA12ecgAEkcCeZA3QkaUABlri4U5GzqH8Wwpf9jRgmwlMieDZkCJwLFHOwJwMZwLBiaxTHBGwFyRTSrzzXDdP0tBDNXT0TMuDcvSMz1IBs657Mc5y1Tc4T-w8BwQjBcFqrgsILA8IxTVmIwQXC2SDAMJDmua5w4udLCqDoDhcHIPTMVgdKNgYCQ9muAANJz+NVVyhL0SkZAnExrAMZr+3iSJTXbHVZhkWwxkhVwjDCwbMMvShRrAcaZQw5YJEuOVrgANVMgB5ABVShSvWjVNtaUEdr2g7jQcY7IKNWCJhMOCO1meDuuSNCcCICA4B0DSsIEslwZaABaMLTXJ3aatieCp2tQcLFQhZFwvbNBQKVL4DWwSycMZxTX2i1apkfqjVRix7o5ldZoxEVuF4ARJXQEnf3cjxpMg6r2oZodLBsWwLE8WL1PehiBXl4VOAOVWwHV8qIaGGDqvCZxoWHW6opkwIYKsWqXFhFw4Jly3cmtnmxVxcpxEdjaWhd8g3ZsD2EO94xR1k8gPCtbrjGNd2w4SnNtJy+OBag+JzFk5x3GiXPYUCYWjAsZOFP7WFLu6s22fi4bS6SnS7wI-cyArv8oh1Axa-rpqbCb0ddstJw2XFocoWLgeMqHnKzIsjQrInzXhxrj258b6rWtunOIjZYDrFmSwBvN9nw8H9db0mkV0uMjayoTm2MIZgxi9lqrMXa8NWoyDbh2EClhhwxCqr3dCb8S470-n6b+Bk8p5hMuZSybpj4VRcLMduYCwQQMhA4UcLNzCmDrq3LWSEHBGC3o9DByUJo81-plLQ5BsqFl4XmSAxCIbTFbuQkWusF79lHIOEE4JPYWAXiHBw7DOZMT3tcMipAxEtGsDMCcMIHAdnhvYQcMkZwdV7LYLW8NUbxA0YxMut47Y2ydPotswEQi2E8FPbsHYYGmg5GYOCkV4JNVmLJZxaxnq4C8a0EIrcApXSUa4Jq1MnCKLglrKwQ5TBY1fv3R68ScDcKmjNfIiT4IghZvDNepCF7-AGEbYxrCZws05MOdRxShqlLGuUt6aC8CJOAm3CKNpbociGBBVpFpPAdJhBMeqkJsaJCAA */
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
            NEXT: 'Assessment',
          },
        },

        Assessment: {
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
      return (getService(context, 'dynamisStore') as any).request(
        geoQuery(context.searchPhrase),
      );
    },
  },
});

export default machine;
