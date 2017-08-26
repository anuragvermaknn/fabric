import React from 'react';
import styles from './Footer.scss';
import theme from '../../theme/mui-theme';

const Footer = () => {
  const { palette } = theme;
  return (
    <div className={styles.container} style={{ backgroundColor: palette.canvasColor }}>
      <div>
        <span className={styles.leftfooter}>All Rights Reserved &#169;2017</span>
        <span className={styles.rightfooter}>icons</span>
      </div>
    </div>
  );
};

Footer.propTypes = {

};

export default Footer;
