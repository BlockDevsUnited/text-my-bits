import { createMultilanguageReducer } from 'redux-multilanguage';
import en from '../languages/en.json';
import es from '../languages/es_uy.json';
import ja from '../languages/ja.json';
import ko from '../languages/ko.json';
import pt from '../languages/pt_br.json';
import ru from '../languages/ru.json';
import zh from '../languages/zh_cn.json';

const currentLanguageCode = localStorage.getItem('language') || 'en';
const languages = {
  en, es, ja, ko, pt, ru, zh,
};

export default createMultilanguageReducer({ currentLanguageCode, languages });
