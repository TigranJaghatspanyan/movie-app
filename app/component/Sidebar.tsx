import { useState } from 'react'
import Image from 'next/image'
import { Search, Home, Tv, Film, List, Clock, ChevronRight, HelpCircle, LogOut } from 'lucide-react'

export default function Sidebar({ isOpen, toggleMenu }: any) {
  const [hoveredItem, setHoveredItem] = useState<any>(null)

  const menuItems = [
    { icon: <Search className="w-6 h-6" />, label: 'Search' },
    { icon: <Home className="w-6 h-6" />, label: 'Home' },
    { icon: <Tv className="w-6 h-6" />, label: 'TV Shows' },
    { icon: <Film className="w-6 h-6" />, label: 'Movies' },
    { icon: <List className="w-6 h-6" />, label: 'Genres' },
    { icon: <Clock className="w-6 h-6" />, label: 'Watch Later' },
  ]

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gray-900 z-10 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => !isOpen && toggleMenu()}
      onMouseLeave={() => isOpen && toggleMenu()}
    >
      <div className="p-4">
        {isOpen && (
          <div className="flex items-center mb-8">
            <Image src="/icons/placeholder.svg" alt="User" width={40} height={40} className="rounded-full" />
            <span className="ml-4 text-lg font-semibold">Daniel</span>
          </div>
        )}
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center">
                  {item.icon}
                  {isOpen && <span className="ml-4">{item.label}</span>}
                </div>
                {!isOpen && hoveredItem === index && (
                  <div className="absolute left-16 bg-gray-800 py-2 px-4 rounded">
                    {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center mb-2 cursor-pointer">
            <HelpCircle className="w-6 h-6" />
            <span className="ml-4">Get Help</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <LogOut className="w-6 h-6" />
            <span className="ml-4">Exit</span>
          </div>
        </div>
      )}
    </div>
  )
}