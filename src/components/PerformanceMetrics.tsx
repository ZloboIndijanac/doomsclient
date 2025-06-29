
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Shield, Clock, Target } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: {
    dodgesPerformed: number;
    threatsAvoided: number;
    accuracy: number;
    uptime: string;
  };
}

export const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  const stats = [
    {
      icon: Target,
      label: 'Dodges Performed',
      value: metrics.dodgesPerformed.toLocaleString(),
      color: 'text-cyan-400'
    },
    {
      icon: Shield,
      label: 'Threats Avoided',
      value: metrics.threatsAvoided.toLocaleString(),
      color: 'text-green-400'
    },
    {
      icon: TrendingUp,
      label: 'Accuracy',
      value: `${metrics.accuracy}%`,
      color: 'text-yellow-400'
    },
    {
      icon: Clock,
      label: 'Uptime',
      value: metrics.uptime,
      color: 'text-blue-400'
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-cyan-400">
          <TrendingUp className="w-5 h-5 mr-2" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Accuracy Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Overall Accuracy</span>
              <span className="text-yellow-400 font-semibold">{metrics.accuracy}%</span>
            </div>
            <Progress 
              value={metrics.accuracy} 
              className="h-2 bg-slate-700"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-slate-700/30 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Icon className={`w-4 h-4 mr-2 ${stat.color}`} />
                    <span className="text-xs text-slate-400 truncate">{stat.label}</span>
                  </div>
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Additional Metrics */}
          <div className="space-y-2 pt-2 border-t border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Success Rate</span>
              <span className="text-green-400">
                {Math.round((metrics.threatsAvoided / metrics.dodgesPerformed) * 100)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Avg Response Time</span>
              <span className="text-cyan-400">142ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Critical Saves</span>
              <span className="text-red-400">23</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
