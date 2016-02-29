import React from 'react';
import Navigation from '../components/navigation.js';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';

export default React.createClass({
  render() {
    return (
      <div>
        <IntlProvider>
        {/* <IntlProvider locale='zh-CN' messages={zhcnMessages}> */}
          <Navigation />
        </IntlProvider>
        <div>Puzzles</div>
      </div>
    )
  }
});
