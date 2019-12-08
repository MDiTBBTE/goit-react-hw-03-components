import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../Transaction/TransactionHistory';
import styles from '../Dashboard/Dashboard.module.css';
import shortid from 'shortid';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    encrease: 0,
    decrease: 0,
  };

  componentDidMount() {
    const localTransactions = JSON.parse(localStorage.getItem('transactions'));

    if (localTransactions) {
      this.setState(state => ({
        balance: localTransactions[localTransactions.length - 1].balance,
        transactions: [...state.transactions, ...localTransactions],
      }));
    } else {
      this.setState(state => ({
        transactions: [...state.transactions],
      }));
    }
  }

  addTransaction = transaction => {
    const transToAdd = {
      ...transaction,
      id: shortid.generate(),
      date: new Date().toLocaleTimeString(),
    };

    this.setState(state => ({
      balance: transaction.balance,
      encrease: transaction.encrease,
      decrease: transaction.decrease,
      transactions: [...state.transactions, transToAdd],
    }));
  };

  render() {
    const { transactions, balance, encrease, decrease } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls
          onAddTransaction={this.addTransaction}
          balance={this.state.balance}
        />
        <Balance balance={balance} encrease={encrease} decrease={decrease} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
