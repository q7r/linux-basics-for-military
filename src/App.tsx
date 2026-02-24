import React, { useState, useEffect } from 'react';
import { courseData } from './data/courseData';
import { DayView } from './components/DayView';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('linux-course-progress');
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const toggleDayComplete = (day: number) => {
    setCompletedDays(prev => {
      const newCompleted = prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day];
      localStorage.setItem('linux-course-progress', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const activeDayData = courseData.find(d => d.day === activeDay) || courseData[0];
  const progressPercentage = Math.round((completedDays.length / courseData.length) * 100);

  return (
    <div className="flex h-screen bg-military-900 text-gray-200 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-military-900 border-r border-military-700 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-military-700 bg-military-800/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-military-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl text-white tracking-wide">LINUX BASICS</h1>
              <p className="text-xs text-military-400 font-mono uppercase">Військовий стандарт</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs font-mono text-military-300 mb-2">
              <span>Бойова готовність</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-military-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-military-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <div className="space-y-1">
            {courseData.map((day) => {
              const isCompleted = completedDays.includes(day.day);
              const isActive = activeDay === day.day;
              
              return (
                <button
                  key={day.day}
                  onClick={() => {
                    setActiveDay(day.day);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center text-left px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-military-700 text-white shadow-md' 
                      : 'hover:bg-military-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-mono mr-3 border ${
                    isCompleted 
                      ? 'bg-military-500 border-military-500 text-white' 
                      : isActive
                        ? 'border-military-400 text-military-300'
                        : 'border-military-600 text-military-500'
                  }`}>
                    {day.day}
                  </div>
                  <div className="flex-1 truncate pr-2">
                    <div className={`text-sm font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {day.title}
                    </div>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-military-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-military-800/40 via-military-900 to-military-900">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-military-700 bg-military-900/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-military-500" />
            <span className="font-display tracking-wide text-white">LINUX BASICS</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-military-300 hover:text-white hover:bg-military-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
          <DayView 
            dayData={activeDayData} 
            isCompleted={completedDays.includes(activeDay)}
            onToggleComplete={() => toggleDayComplete(activeDay)}
          />
        </div>
      </main>
    </div>
  );
}
