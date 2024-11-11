import { ControlCard } from "./ControlCard";

interface ControlGridProps {
  cardStates: {
    ignition: boolean;
    suction: boolean;
    chamber: boolean;
    flameTest: boolean;
    valve: boolean;
    generator: boolean;
  };
  parameters: Record<string, string>;
  onToggleCard: (key: string) => void;
  onParameterChange: (key: string, value: string) => void;
}

export function ControlGrid({ cardStates, parameters, onToggleCard, onParameterChange }: ControlGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(cardStates).map(([key, isActive]) => (
        <ControlCard
          key={key}
          type={key as keyof typeof cardStates}
          isActive={isActive}
          onToggle={() => onToggleCard(key)}
          parameter={parameters[key]}
          onParameterChange={(value) => onParameterChange(key, value)}
        />
      ))}
    </div>
  )
} 