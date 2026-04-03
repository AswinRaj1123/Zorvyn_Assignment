import { useState } from 'react';
import { categories } from '../../data/mockData';

/*
Capture transaction details for both add and edit flows.
Uses initialData (optional), onSubmit callback, and onCancel callback.
Renders the form UI and sends validated payload back to parent.
*/
const TransactionForm = ({ initialData = null, onSubmit, onCancel }) => {
  // Pre-fill fields when editing; otherwise start with empty/default values.
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    type: initialData?.type || 'expense',
    category: initialData?.category || categories[0],
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  /*
  Validate and submit form values.
  Uses browser submit event.
  Calls onSubmit with normalized data or shows validation alert.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit({
      ...formData,
      amount: parseInt(formData.amount),
    });
  };

  /*
  Update form field value in component state.
  Uses browser change event from any input/select.
  Updates matching field in formData state.
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800"
          placeholder="e.g., Grocery Shopping"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800"
            placeholder="1500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
            className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
              formData.type === 'income' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
            className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
              formData.type === 'expense' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3.5 border border-gray-300 dark:border-gray-600 rounded-2xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors"
        >
          {initialData ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;