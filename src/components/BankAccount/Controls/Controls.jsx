import React, { Component } from 'react';
import styles from './Controls.module.css';

class Controls extends Component {
  state = {
    type: '',
    amount: 0,
    balance: 0,
    inputValue: 0,
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleClick = ({ target }) => {
    let inputValue = Number(document.querySelector('input').value);

    this.setState({
      type: target.value,
      amount: inputValue,
      encrease: 0,
      decrease: 0,
    });

    target.value === 'Deposit'
      ? this.setState(state => ({
          balance: state.balance + inputValue,
          encrease: inputValue,
        }))
      : this.setState(state => ({
          balance: state.balance - inputValue,
          decrease: inputValue,
        }));
  };

  handleSubmit = e => {
    e.preventDefault();

    if (+this.state.inputValue > 0) {
      this.props.onAddTransaction({ ...this.state });
      this.setState({ id: '', type: '', amount: '', date: '', inputValue: 0 });
    } else {
      alert('You can`t do this action with negative number');
      this.setState({ inputValue: 0 });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form className={styles.controls} onSubmit={this.handleSubmit}>
        <div className={styles.controlsInner}>
          <input
            className={styles.input}
            type="text"
            onChange={this.handleChange}
            value={inputValue}
          />
          <button
            type="submit"
            value="Deposit"
            className={styles.button}
            onClick={this.handleClick}
          >
            Deposit
          </button>
          <button
            type="submit"
            value="Withdraw"
            className={styles.button}
            onClick={this.handleClick}
          >
            Withdraw
          </button>
        </div>
      </form>
    );
  }
}

export default Controls;
