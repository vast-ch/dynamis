import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dynamis/config/environment';
import { setupComponentMachines } from 'ember-statechart-component';
import { inspect } from '@xstate/inspect';

// Xstate inspection
inspect({
  iframe: false, // open in new window
});

import './app.css';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

setupComponentMachines();
