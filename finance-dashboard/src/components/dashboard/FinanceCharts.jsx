import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../ui/Card';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b'];

/*
Show dashboard charts for balance trend and category spending breakdown.
Uses transactions array from shared state.
Renders line chart and pie chart cards using prepared chart data.
*/
const FinanceCharts = ({ transactions }) => {
  // Prepare data for Balance Trend (Last 7 days - simplified)
  const balanceTrendData = [
    { day: 'Mar 22', balance: 124000 },
    { day: 'Mar 23', balance: 156000 },
    { day: 'Mar 24', balance: 148500 },
    { day: 'Mar 25', balance: 162000 },
    { day: 'Mar 26', balance: 174500 },
    { day: 'Mar 27', balance: 168900 },
    { day: 'Mar 28', balance: 185000 },
  ];

  // Converts expense transactions into category totals for the pie chart.
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line chart: shows a quick trend of account balance over time. */}
      <Card className="lg:col-span-1">
        <h3 className="text-lg font-semibold mb-6">Balance Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Line 
                type="natural" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie chart: shows how spending is distributed by category. */}
      <Card>
        <h3 className="text-lg font-semibold mb-6">Spending Breakdown</h3>
        <div className="h-80 flex items-center justify-center">
          {expenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">No expense data available</p>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          {expenseData.slice(0, 4).map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FinanceCharts;