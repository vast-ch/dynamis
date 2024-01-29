import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Button } from '@frontile/buttons';
import { Form, Input } from '@frontile/forms';
import type { FormResultData } from '@frontile/forms';
import { t } from 'ember-intl';
import type { IntlService } from 'ember-intl';
import { inject as service } from '@ember/service';
import type { NotificationsService } from '@frontile/notifications';

export default class FooterNewsletter extends Component {
  @service notifications!: NotificationsService;
  @service declare intl: IntlService;

  @action
  async onChange(
    data: FormResultData,
    eventType: 'input' | 'submit',
    event: Event | SubmitEvent,
  ) {
    if (eventType === 'submit') {
      try {
        // We have to make type assertion, probably because of:
        // https://github.com/microsoft/TypeScript/issues/19806
        const formData = new FormData(event.target as HTMLFormElement);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

          // As any is necessary here even though
          // it's a recommended way from Netlify: https://docs.netlify.com/forms/setup/
          body: new URLSearchParams(formData as any).toString(),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        this.notifications.add(this.intl.t('newsletter.subscribed'), {
          appearance: 'success',
          preserve: true,
        });
      } catch (error) {
        console.log(error);
        this.notifications.add(this.intl.t('newsletter.error'), {
          appearance: 'error',
          preserve: true,
        });
      }
    }
  }

  <template>
    <div
      class='mt-4 border-t border-white/10 pt-4 sm:mt-4 lg:mt-4 lg:flex lg:items-center lg:justify-between'
    >
      <div>
        <h3 class='text-sm font-semibold leading-6 text-white'>{{t
            'footer.newsletter.heading'
          }}</h3>
        <p class='mt-2 text-sm leading-6 text-gray-300'>{{t
            'footer.newsletter.description'
          }}</p>
      </div>

      {{! When touching this also update: public/netlify/subscription-form.html }}
      <Form
        class='mt-6 sm:flex sm:max-w-md lg:mt-0'
        @onChange={{this.onChange}}
      >
        <Input @type='hidden' name='form-name' @value='newsletter' />
        <label for='email' class='sr-only'>{{t
            'footer.newsletter.label'
          }}</label>
        <div class='w-full min-w-0'>
          <Input
            id='email'
            autocomplete='email'
            placeholder={{t 'footer.newsletter.placeholder'}}
            @type='email'
            name='email'
          />
        </div>
        <div class='mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0'>

          <Button
            class='flex w-full items-center justify-center'
            @intent='primary'
            @type='submit'
          >
            {{t 'footer.newsletter.button'}}
          </Button>
        </div>
      </Form>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Footer::Newsletter': typeof FooterNewsletter;
  }
}
