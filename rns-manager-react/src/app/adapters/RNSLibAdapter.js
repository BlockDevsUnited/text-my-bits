import { rns as registry } from './configAdapter';

// eslint-disable-next-line import/prefer-default-export
export const getOptions = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'local') {
    return {
      contractAddresses: {
        registry,
      },
    };
  }
  return {};
};
