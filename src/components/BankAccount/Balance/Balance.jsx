import React from 'react';
import styles from './Balance.module.css';
import PropTypes from 'prop-types';

const Balance = props => {
  return (
    <section className={styles.balance}>
      <span className={styles.sign}>
        <span role="img">⬆</span> {props.encrease}$
      </span>
      <span className={styles.sign}>
        <span role="img">⬇</span>
        {props.decrease}$
      </span>
      <span className={styles.sign}>Balance: {props.balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number,
  encrease: PropTypes.number,
  decrease: PropTypes.number,
};

export default Balance;
