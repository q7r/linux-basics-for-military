import React from 'react';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';
import { Command } from '../data/courseData';

interface TerminalProps {
  commands: Command[];
}

export function Terminal({ commands }: TerminalProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-military-700 bg-terminal-bg shadow-lg my-6">
      <div className="flex items-center px-4 py-2 bg-military-800 border-b border-military-700">
        <TerminalIcon className="w-4 h-4 text-military-400 mr-2" />
        <span className="text-xs font-mono text-military-300">terminal - bash</span>
      </div>
      <div className="p-4 font-mono text-sm">
        {commands.map((cmd, idx) => (
          <div key={idx} className="mb-4 last:mb-0 group">
            <div className="text-military-400 text-xs mb-1 opacity-80"># {cmd.desc}</div>
            <div className="flex items-start justify-between">
              <div className="flex-1 text-terminal-text break-all">
                <span className="text-military-500 mr-2">$</span>
                {cmd.cmd}
              </div>
              <button
                onClick={() => handleCopy(cmd.cmd, idx)}
                className="ml-4 p-1 rounded text-military-500 hover:text-military-300 hover:bg-military-800 transition-colors opacity-0 group-hover:opacity-100"
                title="Копіювати команду"
              >
                {copiedIndex === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
