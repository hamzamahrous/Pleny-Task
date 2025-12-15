import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { CanMatch, provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
