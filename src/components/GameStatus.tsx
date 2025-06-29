
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wifi, WifiOff, Play, Square } from 'lucide-react';

interface GameStatusProps {
  isConnected: boolean;
  gameState: {
    playerHealth: number;
    playerMana: number;
    playerX: number;
    playerY: number;
  };
  onConnect: () => void;
}

export const GameStatus = ({ isConnected, gameState, onConnect }: GameStatusProps) => {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-cyan-400">
          Game Connection
          <Badge 
            variant={isConnected ? "default" : "destructive"}
            className={isConnected ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
          >
            {isConnected ? (
              <><Wifi className="w-3 h-3 mr-1" /> Connected</>
            ) : (
              <><WifiOff className="w-3 h-3 mr-1" /> Disconnected</>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={onConnect}
          className={`w-full ${isConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-cyan-600 hover:bg-cyan-700'}`}
        >
          {isConnected ? (
            <><Square className="w-4 h-4 mr-2" /> Disconnect</>
          ) : (
            <><Play className="w-4 h-4 mr-2" /> Connect to Game</>
          )}
        </Button>

        {isConnected && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Health</span>
                <span className="text-red-400">{gameState.playerHealth}%</span>
              </div>
              <Progress 
                value={gameState.playerHealth} 
                className="h-2 bg-slate-700"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Mana</span>
                <span className="text-blue-400">{gameState.playerMana}%</span>
              </div>
              <Progress 
                value={gameState.playerMana} 
                className="h-2 bg-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-slate-700/50 p-2 rounded">
                <div className="text-slate-400">Position X</div>
                <div className="text-cyan-400 font-mono">{gameState.playerX.toFixed(1)}</div>
              </div>
              <div className="bg-slate-700/50 p-2 rounded">
                <div className="text-slate-400">Position Y</div>
                <div className="text-cyan-400 font-mono">{gameState.playerY.toFixed(1)}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
