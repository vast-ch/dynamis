import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import type { GeoModel } from 'dynamis/handlers/geo-handler';
import { cssTransition } from 'ember-css-transitions';
import { Button } from '@frontile/buttons';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

export interface AssessmentTableSignature {
  // Element: HTMLTableElement;
  Args: {
    points: Array<GeoModel>;
    selectedPoint: GeoModel | undefined;
    select: ({ point }: { point: GeoModel | undefined }) => void;
  };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class AssessmentTable extends Component<AssessmentTableSignature> {
  <template>
    <div
      class='animate__animated overflow-hidden rounded-md bg-white shadow'
      {{cssTransition
        enterClass='opacity-0'
        enterActiveClass='animate__fadeIn'
        enterToClass='opacity-100'
        leaveClass='opacity-100'
        leaveActiveClass='animate'
        leaveToClass='opacity-0'
      }}
    >
      <ul role='list' class='flex flex-col gap-y-2'>
        {{#each @points as |point|}}
          <Button
            class='w-full'
            @intent={{if (eq point @selectedPoint) 'primary' 'default'}}
            @appearance={{if (eq point @selectedPoint) 'default' 'outlined'}}
            {{on 'click' (fn @select (hash point=point))}}
          >
            {{point.labelPlainText}}
          </Button>
        {{/each}}

      </ul>
    </div>
  </template>
}
