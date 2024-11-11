interface LevelControlProps {
  title: string;
  currentLevel: string;
  setLevel: (level: string) => void;
}

export function LevelControl({ title, currentLevel, setLevel }: LevelControlProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="space-y-2">
        <label className="font-medium">{title}</label>
        <div className="space-y-2">
          {['low', 'medium', 'high'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`${title.toLowerCase()}-${level}`}
                name={title.toLowerCase()}
                value={level}
                checked={currentLevel === level}
                onChange={(e) => setLevel(e.target.value)}
                className="form-radio"
              />
              <label htmlFor={`${title.toLowerCase()}-${level}`} className="capitalize">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 