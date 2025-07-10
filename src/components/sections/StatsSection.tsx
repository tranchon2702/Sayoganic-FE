
import { DataService } from '@/services/dataService';
import { ANIMATION_DELAYS } from '@/constants';

const StatsSection = () => {
  const stats = DataService.getStats();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * ANIMATION_DELAYS.STAGGER_DELAY}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-primary font-serif mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
