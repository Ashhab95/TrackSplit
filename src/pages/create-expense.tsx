import { useState } from 'react';

export default function CreateExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, amount: parseFloat(amount), category, userId }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Expense added!');
      setDescription('');
      setAmount('');
      setCategory('');
      setUserId('');
    } else {
      setMessage(`❌ ${data.error || 'Something went wrong'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Add Expense</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white p-6 rounded shadow">
        <input
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
          Submit
        </button>
        {message && <p className="mt-2 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}