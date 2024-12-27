import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState({});
    const [amount, setAmount] = useState(0);
    const [recieverUpi_id, setRecieverUpi_id] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch transactions from an API or database
        const fetchUserandTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    alert('Please login first');
                    window.location.href = '/login';
                } else {
                    setUser(user);
                    fetchTransactions(user.upi_id);
                    fetchBalance(user.upi_id);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserandTransactions();
    }, []);

    const fetchTransactions = async (upi_id) => {
        try {
            const response = await axios.get(`http://localhost:4003/api/transactions/${upi_id}`);
            setTransactions(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBalance = async (upi_id) => {
        try {
            const response = await axios.get(`http://localhost:4003/api/user/${upi_id}`);
            setUser((prevUser) => ({ ...prevUser, balance: response.data.balance }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleTransaction = async () => {
        if (!amount || !recieverUpi_id) {
            alert('Please enter amount and receiver UPI ID');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4003/api/transactions', {
                senderUpi_id: user.upi_id,
                reciever_upi_id: recieverUpi_id,
                amount: parseFloat(amount),
                message
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                fetchTransactions(user.upi_id);
                fetchBalance(user.upi_id);
                setAmount(0);
                setRecieverUpi_id('');
            }
            setTransactions(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTransaction();
    };

    return (
        <div>
            <h1>Transactions</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <input
                    type="text"
                    value={recieverUpi_id}
                    onChange={(e) => setRecieverUpi_id(e.target.value)}
                    placeholder="Receiver UPI ID"
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Transaction History</h2>
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.amount} sent to {transaction.reciever_upi_id}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Transaction;