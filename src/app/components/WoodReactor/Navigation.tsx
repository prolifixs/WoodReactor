import Image from 'next/image'

export function Navigation() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold relative">
        <Image 
          src="/logo.png?v=1" 
          alt="Logo" 
          width={1366}
          height={678}
          className="h-30 md:h-32 w-auto -mt-10 -mb-10"
          priority
        />
      </div>
      <div className="flex items-center space-x-2 max-w-xs">
        <input 
          type="text" 
          placeholder="Enter Product Key" 
          className="px-3 py-2 rounded text-black font-bold"
        />
        <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Enter
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span>Profile</span>
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
    </nav>
  )
} 