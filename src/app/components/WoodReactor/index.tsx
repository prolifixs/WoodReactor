import { useState, useEffect } from 'react'
import { Navigation } from './Navigation'
import { LeftPanel } from './LeftPanel'
import { StatusCards } from './StatusCards'
import { ControlGrid } from './ControlGrid'
import { ModeControl } from './ModeControl'

// Sequence for automatic mode
const ACTIVATION_SEQUENCE = ['ignition', 'suction', 'chamber', 'flameTest', 'valve', 'generator']
const SEQUENCE_INTERVAL = 5000 // 5 seconds between each activation

const DEFAULT_PARAMETERS = {
  ignition: '50',
  suction: '50',
  chamber: '50',
  flameTest: '50',
  valve: '50',
  generator: '50',
}

export default function WoodReactor() {
  const [time, setTime] = useState(0)
  const [isManualMode, setIsManualMode] = useState(true)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [radiatorLevel, setRadiatorLevel] = useState('medium')
  const [airLevel, setAirLevel] = useState('medium')
  const [autoActivationIndex, setAutoActivationIndex] = useState(-1)
  const [cardStates, setCardStates] = useState({
    ignition: false,
    suction: false,
    chamber: false,
    flameTest: false,
    valve: false,
    generator: false,
  })
  const [parameters, setParameters] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedParams = localStorage.getItem('reactorParameters')
      return savedParams ? JSON.parse(savedParams) : DEFAULT_PARAMETERS
    }
    return DEFAULT_PARAMETERS
  })
  const [isReactorRunning, setIsReactorRunning] = useState(false)

  // Save parameters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reactorParameters', JSON.stringify(parameters))
  }, [parameters])

  const handleParameterChange = (key: string, value: string) => {
    const numValue = Number(value)
    if (numValue >= 0 && numValue <= 100) {
      setParameters((prev: typeof DEFAULT_PARAMETERS) => ({
        ...prev,
        [key]: value
      }))
    }
  }

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Automatic Mode Effect
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!isManualMode && autoActivationIndex >= 0 && autoActivationIndex < ACTIVATION_SEQUENCE.length) {
      const currentComponent = ACTIVATION_SEQUENCE[autoActivationIndex]
      
      // Activate current component
      setCardStates(prev => ({
        ...prev,
        [currentComponent]: true
      }))

      // Schedule next component activation
      timeout = setTimeout(() => {
        setAutoActivationIndex(prev => prev + 1)
      }, SEQUENCE_INTERVAL)
    }
    return () => clearTimeout(timeout)
  }, [isManualMode, autoActivationIndex])

  const handleStartReactor = () => {
    if (!isManualMode) {
      const newReactorState = !isReactorRunning;
      setIsReactorRunning(newReactorState);
      
      if (newReactorState) {
        // Starting reactor
        setCardStates(Object.fromEntries(
          Object.keys(cardStates).map(key => [key, false])
        ) as typeof cardStates);
        setAutoActivationIndex(0);
        setTime(0);
        setIsTimerRunning(true);  // Start timer when reactor starts
      } else {
        // Stopping reactor
        setAutoActivationIndex(-1);
        setCardStates(Object.fromEntries(
          Object.keys(cardStates).map(key => [key, false])
        ) as typeof cardStates);
        setTime(0);  // Reset time to zero
        setIsTimerRunning(false);  // Stop timer
      }
    }
  }

  const handleCardToggle = (key: string) => {
    if (isManualMode) {
      setCardStates(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof cardStates]
      }))
    }
  }

  const handleEmergencyKill = () => {
    setIsTimerRunning(false)
    setAutoActivationIndex(-1)
    setCardStates({
      ignition: false,
      suction: false,
      chamber: false,
      flameTest: false,
      valve: false,
      generator: false,
    })
    setTime(0)
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      remainingSeconds.toString().padStart(2, '0')
    ].join(':');
  }

  const handleManualTimerToggle = () => {
    if (isManualMode) {
      if (isTimerRunning) {
        setIsTimerRunning(false);
        setTime(0);  // Reset time when stopping in manual mode
      } else {
        setIsTimerRunning(true);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="flex-grow grid grid-cols-[25fr_100fr_25fr] gap-4 p-4 text-gray-900">
        <LeftPanel 
          time={time}
          isManualMode={isManualMode}
          isTimerRunning={isTimerRunning}
          isReactorRunning={isReactorRunning}
          radiatorLevel={radiatorLevel}
          airLevel={airLevel}
          handleManualTimerToggle={handleManualTimerToggle}
          setRadiatorLevel={setRadiatorLevel}
          setAirLevel={setAirLevel}
          formatTime={formatTime}
          handleEmergencyKill={handleEmergencyKill}
        />

        <div className="space-y-4">
          <StatusCards />
          <ModeControl 
            isManualMode={isManualMode}
            isReactorRunning={isReactorRunning}
            onModeToggle={() => {
              setIsManualMode(!isManualMode)
              handleEmergencyKill()
            }}
            onStartReactor={handleStartReactor}
          />
          <ControlGrid 
            cardStates={cardStates}
            parameters={parameters}
            onToggleCard={handleCardToggle}
            onParameterChange={handleParameterChange}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-xl text-gray-900">220V AC</span>
          </div>
        </div>
      </main>
    </div>
  )
}