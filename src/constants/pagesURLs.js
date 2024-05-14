import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.usersPage]: `${config.UI_URL_PREFIX}/${pages.usersPage}`,
  [pages.filesPage]: `${config.UI_URL_PREFIX}/${pages.filesPage}`,
  [pages.filePage]: `${config.UI_URL_PREFIX}/${pages.filePage}`,
  [pages.createFilePage]: `${config.UI_URL_PREFIX}/${pages.createFilePage}`,
};

export default result;
