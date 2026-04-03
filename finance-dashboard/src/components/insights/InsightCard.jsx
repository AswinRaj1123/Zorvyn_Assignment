import Card from '../ui/Card';

/*
Display one insight metric with title, value, icon, and explanation.
Uses title, value, description, and icon source.
Renders a reusable insight card block.
*/
const InsightCard = ({ title, value, description, icon }) => {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2 sm:mt-4 tracking-tight truncate">{value}</p>
        </div>
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="w-9 h-9 sm:w-10 sm:h-10 opacity-80 shrink-0 dark:invert"
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-4 sm:mt-6 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

export default InsightCard;