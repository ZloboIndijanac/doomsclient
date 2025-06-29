
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, Skull } from 'lucide-react';

interface Threat {
  id: number;
  x: number;
  y: number;
  type: 'projectile' | 'enemy';
  danger: 'low' | 'medium' | 'high';
  speed: number;
}

interface ThreatRadarProps {
  playerPos: { x: number; y: number };
  threats: Threat[];
  settings: {
    sensitivity: number;
    dodgeDistance: number;
  };
}

export const ThreatRadar = ({ playerPos, threats, settings }: ThreatRadarProps) => {
  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'high': return 'text-red-400 border-red-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-green-400 border-green-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  const getThreatIcon = (type: string) => {
    return type === 'projectile' ? Zap : Skull;
  };

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-cyan-400">
          <Target className="w-5 h-5 mr-2" />
          Threat Radar
          <Badge variant="outline" className="ml-auto text-xs">
            {threats.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Radar Display */}
        <div className="relative w-full aspect-square bg-slate-900/50 rounded-lg border border-cyan-500/20 mb-4">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[25, 50, 75].map(pos => (
              <div key={`h-${pos}`} 
                   className="absolute w-full border-t border-cyan-500/10" 
                   style={{ top: `${pos}%` }} />
            ))}
            {[25, 50, 75].map(pos => (
              <div key={`v-${pos}`} 
                   className="absolute h-full border-l border-cyan-500/10" 
                   style={{ left: `${pos}%` }} />
            ))}
          </div>

          {/* Dodge Range Circle */}
          <div 
            className="absolute border-2 border-cyan-400/30 rounded-full"
            style={{
              left: `${playerPos.x - settings.dodgeDistance}%`,
              top: `${playerPos.y - settings.dodgeDistance}%`,
              width: `${settings.dodgeDistance * 2}%`,
              height: `${settings.dodgeDistance * 2}%`,
            }}
          />

          {/* Player */}
          <div 
            className="absolute w-3 h-3 bg-cyan-400 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
          />

          {/* Threats */}
          {threats.map(threat => {
            const ThreatIcon = getThreatIcon(threat.type);
            return (
              <div
                key={threat.id}
                className={`absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                  threat.danger === 'high' ? 'bg-red-400' :
                  threat.danger === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
              >
                <ThreatIcon className="w-3 h-3 -translate-x-1/2 -translate-y-1/2" />
              </div>
            );
          })}
        </div>

        {/* Threat List */}
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {threats.map(threat => (
            <div key={threat.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  threat.danger === 'high' ? 'bg-red-400' :
                  threat.danger === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <span className="capitalize text-slate-300">{threat.type}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>Speed: {threat.speed}</span>
                <Badge variant="outline" className={`text-xs ${getDangerColor(threat.danger)}`}>
                  {threat.danger}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
