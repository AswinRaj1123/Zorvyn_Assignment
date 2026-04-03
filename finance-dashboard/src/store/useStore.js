import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

/*
Centralize shared app state, actions, and persisted preferences.
Handles role changes, filter updates, CRUD actions, and theme toggle events.
Provides updated global state to all components.
*/
const useStore = create(
  persist(
    (set, get) => ({
      // Core app data used across screens.
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

      // Switch the active tab shown in the main content area.
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Save the selected UI role (admin/viewer).
      setRole: (role) => set({ currentRole: role }),

      // Toggle app theme and sync html class immediately.
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        set({ darkMode: newDarkMode });
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      // Add a newly created transaction at the top of the list.
      addTransaction: (newTransaction) => {
        const transaction = {
          ...newTransaction,
          id: Date.now(),
        };
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },

      // Remove a transaction by id.
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      // Merge changed filter values into existing filter state.
      updateFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      // Reset all filter values to defaults.
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

      /*
      Return transactions after applying active filter rules.
      Uses current transactions and filters from the store.
      Returns a filtered and date-sorted transaction array for UI rendering.
      */
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        // Search by description text.
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter((t) =>
            t.description.toLowerCase().includes(searchLower)
          );
        }

        // Keep only income or expense when that filter is selected.
        if (filters.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        // Keep only transactions from the selected category.
        if (filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }

        // Keep only records from the selected time window.
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

        // Newest records are shown first.
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
      },
    }),
    {
      // Local storage key so data survives page reloads.
      name: 'nexvest-finance-storage',
      // Only save user-specific data that should persist between sessions.
      partialize: (state) => ({
        transactions: state.transactions,
        currentRole: state.currentRole,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useStore;