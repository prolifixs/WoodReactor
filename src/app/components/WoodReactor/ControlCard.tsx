import { Flame, Wind, Cylinder, CloudFog, Pipette, Zap } from 'lucide-react'

const iconMap = {
  ignition: Flame,
  suction: Wind,
  chamber: Cylinder,
  flameTest: CloudFog,
  valve: Pipette,
  generator: Zap,
}

const iconColors = {
  ignition: "#FF4444",    // red
  suction: "#4477FF",     // blue
  chamber: "#44DD77",     // green
  flameTest: "#FF8844",   // orange
  valve: "#AA44FF",       // purple
  generator: "#FFBB44"    // yellow
}

interface ControlCardProps {
  type: keyof typeof iconMap;
  isActive: boolean;
  onToggle: () => void;
  parameter?: string;
  onParameterChange?: (value: string) => void;
}

export function ControlCard({ 
  type, 
  isActive, 
  onToggle, 
  parameter,
  onParameterChange 
}: ControlCardProps) {
  const Icon = iconMap[type]
  
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold capitalize text-gray-900">{type}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isActive}
            onChange={onToggle}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg flex justify-center items-center">
        <Icon 
          className="h-12 w-12" 
          color={isActive ? iconColors[type] : "#374151"}
          strokeWidth={2}
        />
      </div>

      {parameter !== undefined && (
        <div className="mt-4">
          <input
            type="number"
            value={parameter}
            onChange={(e) => onParameterChange?.(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900"
            min="0"
            max="100"
            step="1"
          />
        </div>
      )}
    </div>
  )
} 