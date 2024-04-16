import Component from '@glimmer/component';
import AssessmentMap from './map';
import AssessmentTable from './table';
import AssessmentForm from './form';
import { Button } from '@frontile/buttons';
import { fn } from '@ember/helper';
import { t } from 'ember-intl';
// @ts-expect-error No types yet
import HeroIcon from 'ember-heroicons/components/hero-icon';
import { on } from '@ember/modifier';

export interface AssessmentAddressSignature {
  // Element: HTMLTableElement;
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
    send: (value: string) => void;
  };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class AssessmentAddressComponent extends Component<AssessmentAddressSignature> {
  <template>
    <AssessmentForm
      @submitEnabled={{@state.matches 'Search address.Some phrase'}}
      @onSubmit={{fn @send 'SEARCH'}}
      @onType={{fn @send 'TYPE'}}
      @searchPhrase={{@state.context.searchPhrase}}
    />

    <div class='grid grid-cols-5 w-full py-4 gap-4 flex-1'>
      {{#if (@state.matches 'Select point.Address selection')}}
        <div class='md:col-span-3 col-span-5 h-64 overflow-y-scroll'>
          <AssessmentMap
            @points={{@state.context.searchResults}}
            @selectedPoint={{@state.context.selectedPoint}}
            @select={{fn @send 'SELECT'}}
          />
        </div>
        <div class='md:col-span-2 col-span-5 h-64 overflow-y-scroll'>
          <AssessmentTable
            @points={{@state.context.searchResults}}
            @selectedPoint={{@state.context.selectedPoint}}
            @select={{fn @send 'SELECT'}}
          />
        </div>
      {{else}}
        <div
          class='col-span-5 h-64 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center flex items-center justify-center'
        >
          {{#if (@state.matches 'Select point.No addresses')}}
            <div class='rounded-md bg-yellow-50 p-4'>
              <div class='flex'>
                <div class='flex-shrink-0'>
                  <HeroIcon
                    @icon='exclamation-triangle'
                    class='h-5 w-5 text-yellow-400'
                  />

                </div>
                <div class='ml-3'>
                  <h3 class='text-sm font-medium text-yellow-800'>{{t
                      'assessment.no-results.heading'
                    }}</h3>
                  <div class='mt-2 text-sm text-yellow-700'>
                    <p>{{t 'assessment.no-results.description'}}</p>
                  </div>
                </div>
              </div>
            </div>
          {{else}}
            <p class='text-gray-300'>
              {{t 'assessment.initial-message'}}
            </p>

          {{/if}}
        </div>
      {{/if}}
    </div>

    <div
      class='mt-6 flex items-center justify-end gap-x-12 border-t border-gray-900/10 pt-6'
    >
      <Button
        @intent='primary'
        @type='button'
        {{on 'click' (fn @send 'NEXT')}}
        disabled={{if
          (@state.matches 'Select point.Address selection.Point selected')
          false
          true
        }}
      >
        {{t 'assessment.submit'}}
      </Button>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    AssessmentAddress: typeof AssessmentAddressComponent;
  }
}
