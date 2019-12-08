import React, { Component } from 'react';
import styles from './TransactionHistory.module.css';
import PropTypes from 'prop-types';

class TransactionHistory extends Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.props;

    if (prevProps.transactions.length !== transactions.length) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }

  render() {
    const { transactions } = this.props;

    return (
      <table className={styles.transactionHistory}>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map(action => (
              <tr key={action.id}>
                <td>{action.type}</td>
                <td>{action.amount}$</td>
                <td>4/17/2019, {action.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      action: PropTypes.number,
      // amount: PropTypes.number,
      date: PropTypes.string,
    }),
  ),
};

export default TransactionHistory;
