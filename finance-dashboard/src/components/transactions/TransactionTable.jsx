import { Trash2, Edit2 } from 'lucide-react';
import useStore from '../../store/useStore';
import Card from '../ui/Card';

const TransactionTable = () => {
  const { 
    getFilteredTransactions, 
    currentRole, 
    deleteTransaction 
  } = useStore();

  const filteredTransactions = getFilteredTransactions();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getAmountColor = (type) => {
    return type === 'income' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">All Transactions</h3>
        <div className="text-sm text-gray-500">
          {filteredTransactions.length} transactions
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          No transactions found matching your filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-sm text-gray-500">
                <th className="pb-4 font-medium">DATE</th>
                <th className="pb-4 font-medium">DESCRIPTION</th>
                <th className="pb-4 font-medium">CATEGORY</th>
                <th className="pb-4 font-medium text-right">AMOUNT</th>
                {currentRole === 'admin' && <th className="pb-4 w-20"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-5 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-5 font-medium">{transaction.description}</td>
                  <td className="py-5">
                    <span className="inline-block px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`py-5 font-semibold text-right ${getAmountColor(transaction.type)}`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                  </td>
                  {currentRole === 'admin' && (
                    <td className="py-5">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm("Delete this transaction?")) {
                              deleteTransaction(transaction.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default TransactionTable;