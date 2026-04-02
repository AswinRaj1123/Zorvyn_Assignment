import { ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';

const SummaryCard = ({ title, value, change, type }) => {
  const isPositive = change > 0;
  
  return (
    <Card delay={0.1}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-semibold mt-3 tracking-tight">
            ₹{value.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
          isPositive 
            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
        }`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
    </Card>
  )
};

export default SummaryCard;