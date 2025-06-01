import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { HOSTURL } from '../../utils/constant';
import axios from 'axios';

const Transactions = () => {
  const { city, state, branch } = useParams();
  const [accountNumber, setAccountNumber] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [amountValue, setAmountValue] = useState('');
  const [message, setMessage] = useState('');
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const url = `${HOSTURL}/api/savingaccount/${state}/${city}/${branch}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch accounts');
        }

        setAccountList(data);
      } catch (err) {
        console.error("Error fetching accounts:", err.message);
        setMessage('Failed to fetch account list.');
      }
    };

    fetchAccounts();
  }, [state, city, branch]);

  const updateAmount = async () => {
    const amount = parseFloat(amountValue);

    if (!accountNumber || isNaN(amount) || amount <= 0) {
      setMessage('Please provide a valid account number and amount.');
      return;
    }

    const matchedAccount = accountList.find(
      (account) => String(account.AccountNumber) === String(accountNumber)
    );

    if (!matchedAccount) {
      setMessage('Account not found.');
      return;
    }

    const currentBalance = parseFloat(matchedAccount.initialDeposit || 0);
    let newBalance = currentBalance;
    
    if (transactionType === 'deposit') {
      newBalance += amount;
    } else if (transactionType === 'withdrawal') {
      if (currentBalance < amount) {
        setMessage('Insufficient balance for withdrawal.');
        return;
      }
      newBalance -= amount;
    }

    try {
      const payload = { initialDeposit: newBalance };

      const updateUrl = `${HOSTURL}/api/savingaccount/${state}/${city}/${branch}/${accountNumber}`;
      await axios.put(updateUrl, payload);
     alert(`Transaction successful! current balance: ${newBalance}`);
      setMessage(`current balance${newBalance}  Transaction successful!`);
      setAmountValue('');

      // Refresh the account list to show updated balances
      const res = await fetch(`${HOSTURL}/api/savingaccount/${state}/${city}/${branch}`);
      const data = await res.json();
      setAccountList(data);
    } catch (error) {
      console.error('Error updating account info:', error);
      if (error.response?.status === 404) {
        setMessage('Account update endpoint not found (404).');
      } else {
        setMessage('Failed to update account information.');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-8 border-b-2 border-gray-200 pb-3">
        Make a Transaction
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter account number"
          />
        </div>

        <div>
          <label className="block font-medium">Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={updateAmount}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
        >
          Save
        </button>

        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Transactions;
