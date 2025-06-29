
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Activity, Shield, Zap, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ActivityLogProps {
  isConnected: boolean;
}

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'dodge' | 'threat' | 'warning' | 'info';
  message: string;
}

export const ActivityLog = ({ isConnected }: ActivityLogProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'AutoDodge system initialized'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 5000).toLocaleTimeString(),
      type: 'dodge',
      message: 'Successfully dodged high-threat projectile'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 12000).toLocaleTimeString(),
      type: 'threat',
      message: 'New enemy detected at position (45, 67)'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 18000).toLocaleTimeString(),
      type: 'warning',
      message: 'High projectile density detected'
    }
  ]);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const messages = [
        'Projectile avoided at close range',
        'Threat prediction calculated',
        'Dodge pattern optimized',
        'Enemy movement tracked',
        'Critical dodge executed',
        'Safe position acquired'
      ];

      const types: Array<'dodge' | 'threat' | 'info'> = ['dodge', 'threat', 'info'];
      
      if (Math.random() > 0.7) {
        const newLog: LogEntry = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          type: types[Math.floor(Math.random() * types.length)],
          message: messages[Math.floor(Math.random() * messages.length)]
        };

        setLogs(prev => [newLog, ...prev.slice(0, 19)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'dodge': return Shield;
      case 'threat': return Zap;
      case 'warning': return AlertTriangle;
      default: return Activity;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'dodge': return 'text-green-400 border-green-400/30';
      case 'threat': return 'text-yellow-400 border-yellow-400/30';
      case 'warning': return 'text-red-400 border-red-400/30';
      default: return 'text-cyan-400 border-cyan-400/30';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-cyan-400">
          <Activity className="w-5 h-5 mr-2" />
          Activity Log
          <Badge variant="outline" className="ml-auto text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {logs.map(log => {
              const Icon = getLogIcon(log.type);
              return (
                <div 
                  key={log.id}
                  className={`flex items-start space-x-3 p-2 rounded border ${getLogColor(log.type)} bg-slate-700/20`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getLogColor(log.type).split(' ')[0]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 leading-relaxed">{log.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{log.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
