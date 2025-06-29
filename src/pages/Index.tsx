
import { useState, useEffect } from 'react';
import { GameStatus } from '@/components/GameStatus';
import { ThreatRadar } from '@/components/ThreatRadar';
import { DodgeConfig } from '@/components/DodgeConfig';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { ActivityLog } from '@/components/ActivityLog';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState({
    playerHealth: 85,
    playerMana: 92,
    playerX: 50,
    playerY: 50,
    threats: [
      { id: 1, x: 30, y: 40, type: 'projectile' as const, danger: 'high' as const, speed: 8 },
      { id: 2, x: 70, y: 60, type: 'enemy' as const, danger: 'medium' as const, speed: 3 },
      { id: 3, x: 45, y: 25, type: 'projectile' as const, danger: 'low' as const, speed: 5 }
    ]
  });
  
  const [dodgeSettings, setDodgeSettings] = useState({
    sensitivity: 75,
    reactionTime: 150,
    dodgeDistance: 2.5,
    enablePredictive: true,
    avoidWalls: true
  });

  const [metrics, setMetrics] = useState({
    dodgesPerformed: 247,
    threatsAvoided: 189,
    accuracy: 76.5,
    uptime: '2h 34m'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        threats: prev.threats.map(threat => ({
          ...threat,
          x: Math.max(5, Math.min(95, threat.x + (Math.random() - 0.5) * threat.speed)),
          y: Math.max(5, Math.min(95, threat.y + (Math.random() - 0.5) * threat.speed))
        }))
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleConfigChange = (newConfig: typeof dodgeSettings) => {
    setDodgeSettings(newConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          RotMG AutoDodge Client
        </h1>
        <p className="text-slate-400">Advanced projectile avoidance system</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <GameStatus 
            isConnected={isConnected}
            gameState={gameState}
            onConnect={handleConnect}
          />
          <PerformanceMetrics metrics={metrics} />
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          <ThreatRadar 
            playerPos={{ x: gameState.playerX, y: gameState.playerY }}
            threats={gameState.threats}
            settings={dodgeSettings}
          />
          <ActivityLog isConnected={isConnected} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DodgeConfig 
            settings={dodgeSettings}
            onChange={handleConfigChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
