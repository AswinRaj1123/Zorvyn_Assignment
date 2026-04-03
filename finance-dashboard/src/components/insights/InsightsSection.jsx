import { useMemo } from 'react';
import useStore from '../../store/useStore';
import InsightCard from './InsightCard';
import Card from '../ui/Card';
import highestSpendingCategoryIcon from '../../assets/highest_spending_category.svg';
import monthlyExpenseTrendIcon from '../../assets/Monthly_expense_trend.svg';
import savingsRateIcon from '../../assets/savings_rate.svg';
import averageTransactionIcon from '../../assets/average_transaction.svg';
import totalIncomeIcon from '../../assets/total_income.svg';
import smartObservationIcon from '../../assets/observation.svg';
import smartObservationIllustration from '../../assets/observation_illustration.png';

/*
Generate and present high-level financial insights from visible transactions.
Uses filtered transaction list from shared store selector.
Renders insight cards and smart observation content.
*/
const InsightsSection = () => {
  const { getFilteredTransactions } = useStore();

  const insights = useMemo(() => {
    /*
    Build a month key for month-to-month comparisons.
    Uses a JavaScript Date object.
    Returns a string in YYYY-MM format.
    */
    const getMonthKey = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    };

    // Start with currently visible (already filtered) transaction records.
    const filtered = getFilteredTransactions();
    if (filtered.length === 0) return null;

    // 1) Find which expense category has the highest total spend.
    const expenseByCategory = {};
    filtered
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
      });

    const highestSpendingCategory = Object.entries(expenseByCategory)
      .sort((a, b) => b[1] - a[1])[0];

    // 2) Compare this month's expenses against last month.
    const now = new Date();
    const currentMonthKey = getMonthKey(now);
    const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthKey = getMonthKey(previousMonthDate);

    const currentMonthExpenses = filtered
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthKey))
      .reduce((sum, t) => sum + t.amount, 0);

    const previousMonthExpenses = filtered
      .filter(t => t.type === 'expense' && t.date.startsWith(previousMonthKey))
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyChange = previousMonthExpenses 
      ? Math.round(((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100) 
      : 0;

    // 3) Total income within the currently filtered period.
    const totalIncomeThisPeriod = filtered
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    // 4) Average amount across all visible transactions.
    const avgTransaction = filtered.length 
      ? Math.round(filtered.reduce((sum, t) => sum + t.amount, 0) / filtered.length) 
      : 0;

    return {
      highestSpending: highestSpendingCategory 
        ? { category: highestSpendingCategory[0], amount: highestSpendingCategory[1] } 
        : null,
      monthlyComparison: {
        current: currentMonthExpenses,
        change: monthlyChange
      },
      totalIncome: totalIncomeThisPeriod,
      avgTransaction,
      totalTransactions: filtered.length,
      savingsRate: totalIncomeThisPeriod > 0 
        ? Math.round(((totalIncomeThisPeriod - currentMonthExpenses) / totalIncomeThisPeriod) * 100) 
        : 0
    };
  }, [getFilteredTransactions]); // Recalculate whenever visible transaction data changes.

  if (!insights) {
    return (
      <Card className="p-16 text-center">
        <p className="text-xl text-gray-400">No data available for insights</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight mb-2">Financial Insights</h2>
        <p className="text-gray-500 dark:text-gray-400">Key observations from your spending patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Insight cards: each card explains one metric in plain terms. */}
        {insights.highestSpending && (
          <InsightCard 
            title="Highest Spending Category"
            value={`₹${insights.highestSpending.amount.toLocaleString('en-IN')}`}
            description={`You spent the most on ${insights.highestSpending.category} this period.`}
            icon={highestSpendingCategoryIcon}
          />
        )}

        {/* Monthly Comparison */}
        <InsightCard 
          title="Monthly Expense Trend"
          value={`${insights.monthlyComparison.change > 0 ? '+' : ''}${insights.monthlyComparison.change}%`}
          description={`Compared to last month. ${insights.monthlyComparison.change > 0 ? 'Spending increased.' : 'Good control on expenses!'}`}
          icon={monthlyExpenseTrendIcon}
        />

        {/* Savings Rate */}
        <InsightCard 
          title="Savings Rate"
          value={`${insights.savingsRate}%`}
          description="Of your income this period was saved."
          icon={savingsRateIcon}
        />

        {/* Average Transaction */}
        <InsightCard 
          title="Average Transaction"
          value={`₹${insights.avgTransaction.toLocaleString('en-IN')}`}
          description={`Average size of all transactions (${insights.totalTransactions} total)`}
          icon={averageTransactionIcon}
        />

        {/* Total Income */}
        <InsightCard 
          title="Total Income"
          value={`₹${insights.totalIncome.toLocaleString('en-IN')}`}
          description="Earned during the filtered period"
          icon={totalIncomeIcon}
        />
      </div>

      {/* Smart Observation Card */}
      <Card className="p-8 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="shrink-0">
            <img
              src={smartObservationIllustration}
              alt="Smart observation illustration"
              className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <img src={smartObservationIcon} alt="" aria-hidden="true" className="w-6 h-6 opacity-80 dark:invert" />
              Smart Observation
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {insights.savingsRate > 30 
                ? "You're maintaining excellent financial discipline with a strong savings rate. Keep it up!"
                : insights.monthlyComparison.change < -10
                ? "Great job! Your expenses have reduced significantly compared to last month."
                : "Consider reviewing your spending on Food and Utilities categories as they appear frequently."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InsightsSection;