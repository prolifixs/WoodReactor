import { LevelControl } from "./LevelControl";

interface LeftPanelProps {
  time: number;
  isManualMode: boolean;
  isTimerRunning: boolean;
  isReactorRunning: boolean;
  radiatorLevel: string;
  airLevel: string;
  handleManualTimerToggle: () => void;
  setRadiatorLevel: (level: string) => void;
  setAirLevel: (level: string) => void;
  formatTime: (seconds: number) => string;
  handleEmergencyKill: () => void;
}

export function LeftPanel({
  time,
  isManualMode,
  isTimerRunning,
  radiatorLevel,
  airLevel,
  handleManualTimerToggle,
  setRadiatorLevel,
  setAirLevel,
  formatTime,
  handleEmergencyKill
}: LeftPanelProps) {
  return (
    <div className="space-y-4">
      {/* Timer Card */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">
          {formatTime(time)}
        </div>
        {isManualMode && (
          <button 
            onClick={handleManualTimerToggle}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
        )}
      </div>

      {/* Radiator Level Card */}
      <LevelControl
        title="Radiator Level"
        currentLevel={radiatorLevel}
        setLevel={setRadiatorLevel}
      />

      {/* Air Level Card */}
      <LevelControl
        title="Air Level"
        currentLevel={airLevel}
        setLevel={setAirLevel}
      />

      {/* Emergency Kill Button */}
      <div className="bg-white p-4 rounded-lg shadow">
        <button 
          onClick={handleEmergencyKill}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Emergency Kill
        </button>
      </div>
    </div>
  )
} 