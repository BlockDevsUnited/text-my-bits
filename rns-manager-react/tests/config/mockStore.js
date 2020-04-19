import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = (languages, initialState) => {
  const mock = configureMockStore([thunk]);
  const state = {
    ...initialState,
    multilanguage: {
      currentLanguageCode: 'en',
      languages: {
        en: languages,
      },
    },
  };
  return mock(() => state);
};

export default mockStore;
