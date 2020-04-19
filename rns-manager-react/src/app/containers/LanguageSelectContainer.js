import { changeLanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { LanguageSelectComponent } from '../components';

const mapStateToProps = state => ({
  language: state.multilanguage.currentLanguageCode,
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: (languageCode) => {
    dispatch(changeLanguage(languageCode));
    localStorage.setItem('language', languageCode);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSelectComponent);
