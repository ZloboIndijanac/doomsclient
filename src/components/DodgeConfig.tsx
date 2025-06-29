
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

interface DodgeConfigProps {
  settings: {
    sensitivity: number;
    reactionTime: number;
    dodgeDistance: number;
    enablePredictive: boolean;
    avoidWalls: boolean;
  };
  onChange: (settings: DodgeConfigProps['settings']) => void;
}

export const DodgeConfig = ({ settings, onChange }: DodgeConfigProps) => {
  const updateSetting = (key: keyof typeof settings, value: number | boolean) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-cyan-400">
          <Settings className="w-5 h-5 mr-2" />
          Dodge Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sensitivity */}
        <div className="space-y-2">
          <Label className="text-slate-300">
            Sensitivity: {settings.sensitivity}%
          </Label>
          <Slider
            value={[settings.sensitivity]}
            onValueChange={([value]) => updateSetting('sensitivity', value)}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-slate-400">Higher values = more aggressive dodging</p>
        </div>

        {/* Reaction Time */}
        <div className="space-y-2">
          <Label className="text-slate-300">
            Reaction Time: {settings.reactionTime}ms
          </Label>
          <Slider
            value={[settings.reactionTime]}
            onValueChange={([value]) => updateSetting('reactionTime', value)}
            max={500}
            min={50}
            step={10}
            className="w-full"
          />
          <p className="text-xs text-slate-400">Lower values = faster response time</p>
        </div>

        {/* Dodge Distance */}
        <div className="space-y-2">
          <Label className="text-slate-300">
            Dodge Distance: {settings.dodgeDistance.toFixed(1)} tiles
          </Label>
          <Slider
            value={[settings.dodgeDistance * 10]}
            onValueChange={([value]) => updateSetting('dodgeDistance', value / 10)}
            max={50}
            min={10}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-slate-400">Distance to move when dodging</p>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4 pt-2 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Predictive Dodging</Label>
              <p className="text-xs text-slate-400 mt-1">Predict projectile paths</p>
            </div>
            <Switch
              checked={settings.enablePredictive}
              onCheckedChange={(value) => updateSetting('enablePredictive', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-300">Avoid Walls</Label>
              <p className="text-xs text-slate-400 mt-1">Prevent dodging into walls</p>
            </div>
            <Switch
              checked={settings.avoidWalls}
              onCheckedChange={(value) => updateSetting('avoidWalls', value)}
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700">
          <div className="bg-slate-700/50 p-2 rounded text-center">
            <div className="text-xs text-slate-400">Status</div>
            <div className="text-green-400 font-semibold">Active</div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded text-center">
            <div className="text-xs text-slate-400">Mode</div>
            <div className="text-cyan-400 font-semibold">Auto</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
