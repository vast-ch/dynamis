import Component from '@glimmer/component';
import { t } from 'ember-intl';

export interface AssessmentResultSignature {
  // Element: HTMLTableElement;
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
    send: (value: string) => void;
  };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class AssessmentResultComponent extends Component<AssessmentResultSignature> {
  <template>hi</template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    AssessmentAddress: typeof AssessmentResultComponent;
  }
}
