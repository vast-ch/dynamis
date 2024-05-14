import Component from '@glimmer/component';
import { Form } from '@frontile/forms';
import { Button } from '@frontile/buttons';
import { action } from '@ember/object';
import type { FormResultData } from '@frontile/forms';
import { Input } from '@frontile/forms';
import { t } from 'ember-intl';
import not from 'ember-truth-helpers/helpers/not';
import { hash } from '@ember/helper';

export interface AssessmentFormSignature {
  // Element: HTMLTableElement;
  Args: {
    onSubmit: () => void;
    onType: ({ address }: { address: string | undefined }) => void;
    searchPhrase: string | undefined;
    submitEnabled: boolean;
  };
}

export default class AssessmentForm extends Component<AssessmentFormSignature> {
  @action
  onChange(formData: FormResultData, eventType: 'input' | 'submit') {
    if (eventType === 'submit') {
      this.args.onSubmit();
    } else if (eventType === 'input') {
      this.args.onType({ address: formData['address']?.toString() });
    }
  }

  <template>
    <Form class='w-full' @onChange={{this.onChange}}>
      <div class='space-y-12'>
        <div class='border-gray-900/10'>
          <div class='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div class='col-span-full'>
              <div class='mt-2'>
                <div>
                  <div class='mt-2 flex rounded-md shadow-sm gap-4 items-end'>
                    {{! template-lint-disable no-unknown-arguments-for-builtin-components  }}
                    <Input
                      @value={{@searchPhrase}}
                      placeholder={{t 'assessment.address.placeholder'}}
                      @type='text'
                      name='address'
                      @label={{t 'assessment.address.label'}}
                      id='address'
                      @classes={{hash base='flex-1'}}
                    />

                    <Button
                      disabled={{not @submitEnabled}}
                      @type='submit'
                      @appearance='default'
                    >
                      {{t 'assessment.address.submit'}}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </template>
}
