import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Plus } from 'lucide-react';
import useStore from './store/useStore';
import SummaryCard from './components/dashboard/SummaryCard';
import FinanceCharts from './components/dashboard/FinanceCharts';
import TransactionTable from './components/transactions/TransactionTable';
import TransactionFilters from './components/transactions/TransactionFilters';
import Card from './components/ui/Card';

function App() {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    setRole,
    darkMode,
    toggleDarkMode,
    transactions,
    addTransaction, // we'll use this on Day 5
  } = useStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

            <button onClick={toggleDarkMode} className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-73px)] p-6`}>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl opacity-80">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
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
                    onClick={() => alert("Add Transaction Modal - Coming on Day 5")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                  >
                    <Plus size={20} />
                    Add Transaction
                  </button>
                )}
              </div>

              <TransactionFilters />
              <TransactionTable />
            </>
          )}

          {activeTab === 'insights' && (
            <Card className="p-16 text-center">
              <p className="text-xl text-gray-400">Insights Section</p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;