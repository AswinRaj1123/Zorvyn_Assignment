import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from './store/useStore';
import SummaryCard from './components/dashboard/SummaryCard';
import FinanceCharts from './components/dashboard/FinanceCharts';
import TransactionTable from './components/transactions/TransactionTable';
import TransactionFilters from './components/transactions/TransactionFilters';
import Modal from './components/ui/Modal';
import TransactionForm from './components/transactions/TransactionForm';
import InsightsSection from './components/insights/InsightsSection';

function App() {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    setRole,
    darkMode,
    toggleDarkMode,
    transactions,
    addTransaction,
    deleteTransaction,
  } = useStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Summary calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'insights', label: 'Insights', icon: '📈' },
  ];

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingTransaction) {
      // For simplicity, we'll delete old and add new (update logic can be enhanced later)
      deleteTransaction(editingTransaction.id);
      addTransaction(formData);
    } else {
      addTransaction(formData);
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">Z</div>
            <div>
              <h1 className="font-semibold text-xl tracking-tight">Zorvyn Finance</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">FinTech Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl text-sm">
              <span className="text-gray-500 dark:text-gray-400">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent outline-none font-medium cursor-pointer"
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <button onClick={toggleDarkMode} className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar - Improved for mobile */}
        <aside 
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 lg:translate-x-0 p-6 overflow-y-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <nav className="space-y-1 pt-4 lg:pt-0">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => { 
                  setActiveTab(item.id); 
                  setIsSidebarOpen(false); 
                }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl opacity-80">{item.icon}</span>
                <span className="text-[15px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-12 text-xs text-gray-400 dark:text-gray-500 px-4 hidden lg:block">
            Zorvyn FinTech Pvt. Ltd.<br />
            Assignment Dashboard
          </div>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen">
          {activeTab === 'dashboard' && (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Your financial overview at a glance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <SummaryCard title="Total Balance" value={totalBalance} change={12} />
                <SummaryCard title="Total Income" value={totalIncome} change={8} />
                <SummaryCard title="Total Expenses" value={totalExpense} change={-5} />
              </div>

              <FinanceCharts transactions={transactions} />
            </>
          )}

          {activeTab === 'transactions' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">Transactions</h2>
                  <p className="text-gray-500 dark:text-gray-400">Manage your income and expenses</p>
                </div>
                
                {currentRole === 'admin' && (
                  <button 
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all active:scale-95"
                  >
                    <Plus size={20} />
                    Add Transaction
                  </button>
                )}
                {currentRole === 'viewer' && (
                  <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                    Viewer mode: Read-only
                  </div>
                )}
              </div>

              <TransactionFilters />
              <TransactionTable openEditModal={openEditModal} />   {/* We'll update table next */}
            </>
          )}

          {activeTab === 'insights' && <InsightsSection />}
        </main>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }} 
        title={editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      >
        <TransactionForm 
          initialData={editingTransaction}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;