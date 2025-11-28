import React from 'react';
import { Task, TaskType } from '../types';
import { Clock, MapPin, Zap, ShieldCheck } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onAccept: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onAccept }) => {
  const isCorporate = task.type === TaskType.CORPORATE;

  return (
    <div className={`relative bg-white p-4 rounded-xl border ${isCorporate ? 'border-amber-200 shadow-amber-100' : 'border-slate-100'} shadow-sm mb-4`}>
      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-2">
        {task.isUrgent && (
          <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-red-100">
            <Zap size={12} fill="currentColor" /> URGENT
          </span>
        )}
        {task.author.isVerified && (
           <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-blue-100">
           <ShieldCheck size={12} /> VERIFIED
         </span>
        )}
      </div>

      <div className="flex gap-3 mb-3">
        <img
          src={task.author.avatar}
          alt={task.author.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-200"
        />
        <div>
          <h3 className="font-semibold text-slate-900 leading-tight pr-16">{task.title}</h3>
          <p className="text-xs text-slate-500 mt-1">{task.author.name}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-xs text-slate-500 gap-1">
             <Clock size={12} />
             <span>{task.durationHours}h • {task.type}</span>
          </div>
          <div className="flex items-center text-xs text-slate-500 gap-1">
             <MapPin size={12} />
             <span>{task.location}</span>
          </div>
        </div>

        <button
          onClick={() => onAccept(task)}
          className={`px-4 py-2 rounded-lg font-bold text-sm shadow-sm active:scale-95 transition-transform ${
            isCorporate
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          Earn {task.rewardTC.toFixed(1)} TC
        </button>
      </div>
    </div>
  );
};