import useStore from '../../store/useStore';
import { categories } from '../../data/mockData';

const TransactionFilters = () => {
  const { filters, updateFilters, resetFilters } = useStore();

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* Search Input */}
      <div className="flex-1 min-w-50">
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Type Filter */}
      <select
        value={filters.type}
        onChange={(e) => updateFilters({ type: e.target.value })}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 text-sm focus:outline-none"
      >
        <option value="all">All Types</option>
        <option value="income">Income Only</option>
        <option value="expense">Expense Only</option>
      </select>

      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={(e) => updateFilters({ category: e.target.value })}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 text-sm focus:outline-none"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="px-6 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default TransactionFilters;