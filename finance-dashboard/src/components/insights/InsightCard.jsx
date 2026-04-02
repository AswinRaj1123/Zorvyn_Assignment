import Card from '../ui/Card';

const InsightCard = ({ title, value, description, icon }) => {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-semibold mt-4 tracking-tight">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

export default InsightCard;