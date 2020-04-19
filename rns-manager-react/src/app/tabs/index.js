import admin from './admin';
import home from './home';
import publicResolver from './publicResolver';
import multiChainResolver from './multiChainResolver';
import strResolver from './stringResolver';
import resolve from './resolve';
import search from './search';
import registrar from './registrar';
import renew from './renew';
import error from './error';
import newAdmin from './newAdmin';
import faqTab from './faq';

export default {
  admin,
  home,
  publicResolver,
  multiChainResolver,
  strResolver,
  search,
  registrar,
  resolve,
  renew,
  error,
  newAdmin,
  faqTab,
};

export { AdminTab } from './admin';
export { NewAdminTab } from './newAdmin';
export { HomeTab } from './home';
export { NotificationTab } from './notifications';
export { PublicResolverTab } from './publicResolver';
export { MultiChainResolverTab } from './multiChainResolver';
export { StringResolverTab } from './stringResolver';
export { ResolveTab } from './resolve';
export { SearchTab } from './search';
export { RegistrarTab } from './registrar';
export { RenewTab } from './renew';
export { default as NoMetamaskTab } from './NoMetamaskTab';
export { default as SetUpTab } from './SetUpTab';
export { UserTab } from './user';
export { default as ErrorTab } from './error';
export { default as FaqTab } from './faq';
