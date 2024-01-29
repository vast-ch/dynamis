import '@glint/environment-ember-loose';

import type EmberIntlRegistry from 'ember-intl/template-registry';
import type CssTransitionsRegistry from 'ember-css-transitions/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
// This import extends the type of `StateMachine` to be glint-compatible
import 'ember-statechart-component/glint';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberIntlRegistry /* other addon registries */ {
    // local entries
  }
  export default interface Registry
    extends CssTransitionsRegistry /* other addon registries */ {
    // local entries
  }
  export default interface Registry
    extends EmberTruthRegistry /* other addon registries */ {
    // local entries
  }
}
