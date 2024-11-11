import { Battery, Thermometer, Gauge } from 'lucide-react'

export function StatusCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatusCard icon={<Battery className="h-6 w-6 text-gray-700" />} label="Voltage" value="220V" />
      <StatusCard icon={<Thermometer className="h-6 w-6 text-gray-700" />} label="Temperature" value="150°C" />
      <StatusCard icon={<Gauge className="h-6 w-6 text-gray-700" />} label="Gas Storage" value="500 PSI" />
    </div>
  )
}

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatusCard({ icon, label, value }: StatusCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-xl text-gray-900">{label}: {value}</span>
      </div>
    </div>
  )
} 