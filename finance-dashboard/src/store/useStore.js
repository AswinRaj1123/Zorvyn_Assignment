import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: mockTransactions,
      currentRole: 'admin',        // 'admin' or 'viewer'
      darkMode: false,
      activeTab: 'dashboard',
      filters: {
        search: '',
        type: 'all',               // 'all', 'income', 'expense'
        category: 'all',
        period: 'all'              // we'll use this later
      },

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      setRole: (role) => set({ currentRole: role }),

      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        set({ darkMode: newDarkMode });
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      addTransaction: (newTransaction) => {
        const transaction = {
          ...newTransaction,
          id: Date.now(),
        };
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      updateFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      resetFilters: () => {
        set({
          filters: {
            search: '',
            type: 'all',
            category: 'all',
            period: 'all',
          },
        });
      },

      // Helper to get filtered transactions (we'll use this in components)
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter((t) =>
            t.description.toLowerCase().includes(searchLower)
          );
        }

        // Type filter
        if (filters.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        // Category filter
        if (filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }

        // Period filter
        const now = new Date();
        if (filters.period === 'thisMonth') {
          filtered = filtered.filter((t) => {
            const txDate = new Date(t.date);
            return txDate.getMonth() === now.getMonth() && 
                   txDate.getFullYear() === now.getFullYear();
          });
        } else if (filters.period === 'last3Months') {
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          filtered = filtered.filter((t) => new Date(t.date) >= threeMonthsAgo);
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
      },
    }),
    {
      name: 'nexvest-finance-storage',   // localStorage key
      partialize: (state) => ({
        transactions: state.transactions,
        currentRole: state.currentRole,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useStore;