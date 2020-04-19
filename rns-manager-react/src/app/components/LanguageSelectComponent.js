import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

const languages = [
  { value: 'en', displayValue: 'English' },
  { value: 'es', displayValue: 'Español' },
  { value: 'zh', displayValue: '简体中文' },
  { value: 'ja', displayValue: '日本語' },
  { value: 'ko', displayValue: '한국어' },
  { value: 'pt', displayValue: 'Português' },
  { value: 'ru', displayValue: 'Русский' },
];

class LanguageSelectComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { language: props.language };

    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  onLanguageChange(value) {
    const { changeLanguage } = this.props;

    this.setState({ language: value });

    changeLanguage(value);
  }

  render() {
    const { language } = this.state;

    const currentLanguage = languages.find(lang => lang.value === language).displayValue;

    return (
      <Dropdown key="dropdown-language" onSelect={this.onLanguageChange} value={language}>
        <Dropdown.Toggle>{currentLanguage}</Dropdown.Toggle>

        <Dropdown.Menu>
          {
            languages.map(dropItem => (
              <Dropdown.Item eventKey={dropItem.value} key={dropItem.value} value={dropItem.value}>
                {dropItem.displayValue}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

LanguageSelectComponent.propTypes = {
  language: propTypes.string.isRequired,
  changeLanguage: propTypes.func.isRequired,
};

export default LanguageSelectComponent;
