import Component from '@glimmer/component';
import AssessmentHeader from './header';
import AssessmentMachine from './machine';
import AssessmentPoint from './point';
import AssesmentResult from './result';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class AssessmentComponent extends Component {
  <template>
    <main
      class='px-4 sm:px-6 lg:px-8 container mx-auto lg:pb-4 pb-4 sm:pb-2 flex flex-col lg:pt-40 pt-24 sm:pt-32'
    >

      <AssessmentMachine as |state send|>
        <AssessmentHeader />

        {{#if (state.matches 'Point selection')}}
          <AssessmentPoint @state={{state}} @send={{send}} />
        {{else if (state.matches 'Result')}}
          <AssesmentResult @state={{state}} @send={{send}} />
        {{else}}
          Out
        {{/if}}
      </AssessmentMachine>

    </main>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Assessment: typeof AssessmentComponent;
  }
}
