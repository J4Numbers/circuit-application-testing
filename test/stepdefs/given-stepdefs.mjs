import { Given } from '@cucumber/cucumber';
import {
  attemptLogin,
  getGeneralPageOfApplication,
} from '../workers/driver-workers.mjs';

Given('I am an anonymous visitor to the site', function () {});

Given('I have already visited the site as an anonymous user', function () {
  return getGeneralPageOfApplication(this, 'home');
});

Given('I have already visited the site as a full user', async function () {
  await getGeneralPageOfApplication(this, 'home');
  await getGeneralPageOfApplication(this, 'login');
  return attemptLogin(this, 'administrator', 'administrator');
});

Given('I am looking at the {string} page', function (pageName) {
  return getGeneralPageOfApplication(this, pageName);
});
