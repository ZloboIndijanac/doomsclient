
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Cpu, PlayCircle, StopCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GameProcess, injectionManager } from '@/utils/injectionManager';

interface ProcessScannerProps {
  onInjectionChange: (injected: boolean) => void;
}

export const ProcessScanner = ({ onInjectionChange }: ProcessScannerProps) => {
  const [processes, setProcesses] = useState<GameProcess[]>([]);
  const [scanning, setScanning] = useState(false);
  const [injecting, setInjecting] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<GameProcess | null>(null);

  const scanForProcesses = async () => {
    setScanning(true);
    try {
      const foundProcesses = await injectionManager.findGameProcess();
      setProcesses(foundProcesses);
    } catch (error) {
      console.error('Process scan failed:', error);
    } finally {
      setScanning(false);
    }
  };

  const handleInject = async (process: GameProcess) => {
    setInjecting(true);
    try {
      const success = await injectionManager.injectIntoProcess(process);
      if (success) {
        setSelectedProcess(process);
        onInjectionChange(true);
      }
    } catch (error) {
      console.error('Injection failed:', error);
    } finally {
      setInjecting(false);
    }
  };

  const handleDisconnect = () => {
    injectionManager.disconnect();
    setSelectedProcess(null);
    onInjectionChange(false);
  };

  useEffect(() => {
    scanForProcesses();
  }, []);

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-cyan-400">
          <div className="flex items-center">
            <Cpu className="w-5 h-5 mr-2" />
            Process Scanner
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={scanForProcesses}
            disabled={scanning}
            className="border-cyan-500/30 text-cyan-400"
          >
            <Search className="w-4 h-4 mr-1" />
            {scanning ? 'Scanning...' : 'Scan'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedProcess ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold">Injected</span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDisconnect}
                className="h-7"
              >
                <StopCircle className="w-3 h-3 mr-1" />
                Disconnect
              </Button>
            </div>
            <div className="text-sm">
              <div className="text-slate-300">{selectedProcess.name}</div>
              <div className="text-slate-400 text-xs">PID: {selectedProcess.pid}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {processes.length > 0 ? (
              processes.map(process => (
                <div key={process.pid} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                  <div className="flex-1">
                    <div className="text-sm text-slate-200">{process.name}</div>
                    <div className="text-xs text-slate-400">
                      PID: {process.pid} | {process.windowTitle}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={process.isRunning ? "default" : "destructive"} className="text-xs">
                      {process.isRunning ? 'Running' : 'Stopped'}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleInject(process)}
                      disabled={!process.isRunning || injecting}
                      className="h-7 bg-cyan-600 hover:bg-cyan-700"
                    >
                      <PlayCircle className="w-3 h-3 mr-1" />
                      {injecting ? 'Injecting...' : 'Inject'}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-slate-400">
                {scanning ? 'Scanning for RotMG processes...' : 'No RotMG processes found'}
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-slate-700">
          <div className="text-xs text-slate-400 space-y-1">
            <div>• Make sure RotMG is running</div>
            <div>• Run as Administrator if injection fails</div>
            <div>• Disable antivirus temporarily if needed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
