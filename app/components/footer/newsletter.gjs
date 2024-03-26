import Component from "@glimmer/component";
import { action } from "@ember/object";
import { Input } from "@frontile/forms";
import { Button } from "@frontile/buttons";
import { Form } from "@frontile/forms";
import { t } from "ember-intl";
import { inject as service } from "@ember/service";

export default class FooterNewsletter extends Component {
  @service notifications;
  @service intl;

  @action
  onChange(data, event, bar) {
    console.log({ data }, { event }, { bar });
    if (event === "submit") {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          this.notifications.add(this.intl.t("newsletter.subscribed"), {
            appearance: "success",
            preserve: true,
          });
        })
        .catch((error) => {
          console.log(error);
          this.notifications.add(this.intl.t("newsletter.error"), {
            appearance: "error",
            preserve: true,
          });
        });
    }
  }

  <template>
    <div
      class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between"
    >
      <div>
        <h3 class="text-sm font-semibold leading-6 text-white">{{t
            "footer.newsletter.heading"
          }}</h3>
        <p class="mt-2 text-sm leading-6 text-gray-300">{{t
            "footer.newsletter.description"
          }}</p>
      </div>

      <Form class="mt-6 sm:flex sm:max-w-md lg:mt-0" @onChange={{this.onChange}}>
        <label for="email" class="sr-only">{{t "footer.newsletter.label" }}</label>
        <div class="w-full min-w-0">
          <Input
            id="email"
            autocomplete="email"
            placeholder={{t "footer.newsletter.placeholder"}}
            @type="email"
            @name="email"

          />
        </div>
        <div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">

        <Button class="flex w-full items-center justify-center" @intent="primary" @type="submit">
          {{t "footer.newsletter.button"}}
        </Button>
        </div>
      </Form>

    </div>
  </template>
}
