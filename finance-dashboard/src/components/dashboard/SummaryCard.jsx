import { ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';

/*
Display one summary metric with value and change indicator.
Uses title string, value number, and change percentage number.
Renders a styled summary card with positive/negative visual cues.
*/
const SummaryCard = ({ title, value, change }) => {
  // Decide whether this metric should be shown as positive or negative.
  const isPositive = change > 0;
  
  return (
    <Card delay={0.1}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2 sm:mt-3 tracking-tight truncate">
            ₹{value.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full shrink-0 ${
          isPositive 
            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
        }`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="hidden sm:inline">{Math.abs(change)}%</span>
        </div>
      </div>
    </Card>
  )
};

export default SummaryCard;