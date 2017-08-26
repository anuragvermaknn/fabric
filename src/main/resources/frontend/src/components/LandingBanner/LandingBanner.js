import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import config from '../../config';
import styles from './LandingBanner.scss';
import theme from '../../theme/mui-theme';

export default class LandingBanner extends Component {
  render() {
    const { palette } = theme;
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.banner} style={{ backgroundColor: palette.primary2Color }}>
        <div className={styles.image}>
          <img src={logoImage} alt={config.app.title} />
        </div>
        <h1 className={styles.header} style={{ color: palette.alternateTextColor }}>{config.app.title}</h1>
        <h2 className={styles.subheader} style={{ color: palette.alternateTextColor }}>
          <FormattedMessage id="header.tagline" defaultMessage={config.app.description} />
        </h2>

      </div>
    );
  }
}
