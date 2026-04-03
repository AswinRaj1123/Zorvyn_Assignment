import { useEffect, useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from './store/useStore';
import SummaryCard from './components/dashboard/SummaryCard';
import FinanceCharts from './components/dashboard/FinanceCharts';
import TransactionTable from './components/transactions/TransactionTable';
import TransactionFilters from './components/transactions/TransactionFilters';
import Modal from './components/ui/Modal';
import TransactionForm from './components/transactions/TransactionForm';
import InsightsSection from './components/insights/InsightsSection';
import ThemeToggle from './components/ui/ThemeToggle';
import RoleToggle from './components/ui/RoleToggle';
import dashboardIcon from './assets/dashboard.svg';
import transactionIcon from './assets/transaction.svg';
import insightIcon from './assets/insight.svg';
import brandLogo from './assets/NexVest Logo.png';

/*
Main screen container that connects store state to all major UI sections.
No direct props; reads shared state from the store.
Renders header, sidebar navigation, tab content, and transaction modal.
*/
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

  // Derive totals for dashboard summary cards from current transaction data.
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  /*
  Keep document-level theme classes/colors in sync with current darkMode state.
  Uses darkMode value from shared store.
  Updates html/body classes and base colors.
  */
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827'; // gray-950
      document.body.style.color = '#f3f4f6'; // gray-100
    } else {
      htmlElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb'; // gray-50
      document.body.style.color = '#111827'; // gray-900
    }
  }, [darkMode]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
    { id: 'transactions', label: 'Transactions', icon: transactionIcon },
    { id: 'insights', label: 'Insights', icon: insightIcon },
  ];

  /*
  Open transaction modal for creating a new entry.
  Clears editing state and opens modal.
  */
  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  /*
  Open transaction modal pre-filled with an existing transaction.
  Uses selected transaction from the table.
  Sets editing state and opens modal.
  */
  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  /*
  Save submitted transaction data for both add and edit flows.
  Uses formData from TransactionForm.
  Updates transaction list and closes/reset modal state.
  */
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          {/* Brand logo */}
          <div className="flex items-center">
            <img
              src={brandLogo}
              alt="NexVest logo"
              className="h-8 sm:h-10 w-auto object-contain max-w-28 sm:max-w-40"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Role switch changes what actions are available in the UI. */}
            <RoleToggle currentRole={currentRole} setRole={setRole} darkMode={darkMode} />

            {/* Dark Mode Toggle */}
            <ThemeToggle darkMode={darkMode} onClick={toggleDarkMode} />

            {/* Mobile-only button for opening/closing sidebar navigation. */}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2">
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
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className={`w-6 h-6 shrink-0 transition-all ${
                    activeTab === item.id
                      ? darkMode
                        ? 'opacity-100 brightness-0 invert'
                        : 'opacity-100'
                      : darkMode
                        ? 'opacity-80 brightness-0 invert'
                        : 'opacity-70'
                  }`}
                />
                <span className="text-[15px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-12 text-xs text-gray-400 dark:text-gray-500 px-4 hidden lg:block">
            Assignment Dashboard<br />
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
          {/* Dashboard tab */}
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

          {/* Transactions tab */}
          {activeTab === 'transactions' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">Transactions</h2>
                  <p className="text-gray-500 dark:text-gray-400">Manage your income and expenses</p>
                </div>
                
                <div className="flex items-center gap-3">
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
              </div>

              <TransactionFilters />
              
              {/* Grouping Toggle - Simple */}
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  className="px-5 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Group by Category
                </button>
                <button
                  className="px-5 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Group by Month
                </button>
              </div>

              <TransactionTable openEditModal={openEditModal} />
            </>
          )}

          {/* Insights tab */}
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