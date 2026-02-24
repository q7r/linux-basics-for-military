import React from 'react';
import { motion } from 'motion/react';
import { DayContent } from '../data/courseData';
import { Terminal } from './Terminal';
import { ShieldAlert, BookOpen, Target, CheckCircle2, Terminal as TerminalIcon } from 'lucide-react';

interface DayViewProps {
  dayData: DayContent;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function DayView({ dayData, isCompleted, onToggleComplete }: DayViewProps) {
  return (
    <motion.div
      key={dayData.day}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto pb-24"
    >
      <header className="mb-8 border-b border-military-700 pb-6">
        <div className="flex items-center gap-3 mb-2 text-military-400 font-mono text-sm uppercase tracking-wider">
          <span className="bg-military-800 px-2 py-1 rounded">День {dayData.day} / 21</span>
          {isCompleted && (
            <span className="flex items-center text-green-500 bg-green-500/10 px-2 py-1 rounded">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Виконано
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-white mb-3 tracking-wide">
          {dayData.title}
        </h1>
        <p className="text-lg text-military-300 border-l-4 border-military-500 pl-4 py-1">
          {dayData.description}
        </p>
      </header>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-white">
          <BookOpen className="w-6 h-6 text-military-400" />
          <h2>Теоретична підготовка</h2>
        </div>
        <div className="bg-military-800/50 rounded-xl p-6 border border-military-700/50 leading-relaxed text-gray-300 shadow-inner">
          {dayData.theory}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-white">
          <TerminalIcon className="w-6 h-6 text-military-400" />
          <h2>Бойовий арсенал (Команди)</h2>
        </div>
        <Terminal commands={dayData.commands} />
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-white">
          <Target className="w-6 h-6 text-red-400" />
          <h2>Бойове завдання</h2>
        </div>
        <div className="bg-red-950/30 rounded-xl p-6 border border-red-900/50 text-red-200">
          <p className="font-medium">{dayData.mission}</p>
        </div>
      </section>

      <div className="flex justify-center">
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            isCompleted
              ? 'bg-military-800 text-military-400 border border-military-600 hover:bg-military-700'
              : 'bg-military-500 text-white hover:bg-military-400 shadow-[0_0_20px_rgba(101,120,77,0.4)] hover:shadow-[0_0_30px_rgba(134,157,102,0.6)]'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-6 h-6" />
              Відмінити виконання
            </>
          ) : (
            <>
              <ShieldAlert className="w-6 h-6" />
              Виконано
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
