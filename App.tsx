import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TaskCard } from './components/TaskCard';
import { INITIAL_USER, MOCK_TASKS, SKILL_CATEGORIES } from './constants';
import { Task, User, TaskType } from './types';
import { 
  Wallet, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  Crown, 
  Settings, 
  LogOut,
  MapPin,
  Camera,
  Shield,
  Search,
  Filter,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  
  // Post Task State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(SKILL_CATEGORIES[0]);
  const [duration, setDuration] = useState(1);
  const [isUrgent, setIsUrgent] = useState(false);
  
  // Calculations for Post Task
  const calculatedCost = duration * selectedSkill.weight;
  const urgentFee = isUrgent ? 5 : 0;

  const handleAcceptTask = (task: Task) => {
    alert(`You have accepted: ${task.title}. \n\nSecurity: Audio recording will start automatically upon arrival.`);
    // Simulate updating task status
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'IN_PROGRESS' } : t));
  };

  const handlePostTask = () => {
    if (user.tcBalance < calculatedCost && user.tcBalance < -5) {
      alert("Credit Limit Reached! You must earn TC before posting more tasks.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle || 'New Request',
      description: newTaskDesc || 'No description provided.',
      type: selectedSkill.weight > 1.5 ? TaskType.EXPERT : TaskType.GENERAL,
      skillWeight: selectedSkill.weight,
      durationHours: duration,
      rewardTC: calculatedCost,
      costRMB: 0,
      location: 'Current Location',
      author: {
        name: user.name,
        avatar: user.avatar,
        isVerified: user.isVerified
      },
      isUrgent: isUrgent,
      status: 'OPEN'
    };

    setTasks([newTask, ...tasks]);
    setUser(prev => ({
      ...prev,
      tcBalance: prev.tcBalance - calculatedCost,
      creditBalance: prev.creditBalance - urgentFee
    }));
    setActiveTab('home');
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsUrgent(false);
  };

  // --- VIEWS ---

  const HomeView = () => (
    <div className="pb-24 pt-4 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Time Pawnshop</h1>
          <p className="text-sm text-slate-500">Your time, your currency.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
          <MapPin size={14} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-700">Beijing, Haidian</span>
        </div>
      </div>

      {/* Balance Summary Card */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Time Balance (TC)</p>
            <h2 className={`text-3xl font-bold ${user.tcBalance < 0 ? 'text-red-400' : 'text-white'}`}>
              {user.tcBalance.toFixed(1)} <span className="text-sm font-normal text-slate-400">TC</span>
            </h2>
            {user.tcBalance < 0 && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-300">
                <AlertCircle size={12} />
                <span>Debt Active - Complete tasks to repay</span>
              </div>
            )}
          </div>
          <div className="text-right">
             <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Credits</p>
             <h2 className="text-xl font-bold text-emerald-400">¥{user.creditBalance}</h2>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 flex items-center px-3 h-12 shadow-sm">
          <Search size={18} className="text-slate-400 mr-2" />
          <input type="text" placeholder="Search tasks..." className="bg-transparent w-full outline-none text-sm" />
        </div>
        <button className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm text-slate-600">
          <Filter size={18} />
        </button>
      </div>

      {/* Tasks Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-bold text-slate-800">Nearby Requests</h3>
          <span className="text-xs text-amber-600 font-medium cursor-pointer">View Map</span>
        </div>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onAccept={handleAcceptTask} />
        ))}
      </div>
    </div>
  );

  const PostView = () => (
    <div className="pb-24 pt-4 px-4 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Post a Request</h1>
      
      <div className="flex-1 space-y-6">
        {/* Title & Desc */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">What do you need?</label>
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g., Walk my dog, Teach me Math" 
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea 
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              placeholder="Provide details about the task..." 
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none h-24 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Skill Selector (Weight) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category & Skill Weight</label>
          <div className="grid grid-cols-2 gap-2">
            {SKILL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedSkill(cat)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSkill.id === cat.id 
                    ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-xs font-bold text-slate-400">x{cat.weight.toFixed(1)}</span>
                </div>
                <div className="text-sm font-medium text-slate-800">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Slider */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
           <div className="flex justify-between mb-2">
             <label className="text-sm font-medium text-slate-700">Duration</label>
             <span className="text-sm font-bold text-amber-600">{duration} Hour(s)</span>
           </div>
           <input 
             type="range" 
             min="0.5" 
             max="5" 
             step="0.5" 
             value={duration}
             onChange={(e) => setDuration(parseFloat(e.target.value))}
             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
           />
        </div>

        {/* Urgent Boost */}
        <div 
          onClick={() => setIsUrgent(!isUrgent)}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
            isUrgent ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="font-medium text-slate-900">Expedited Service</div>
              <div className="text-xs text-slate-500">Top placement + notification</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-slate-900">¥5.00</div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ml-auto ${isUrgent ? 'bg-red-500 border-red-500' : 'border-slate-300'}`}>
              {isUrgent && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Cost */}
      <div className="mt-8 border-t border-slate-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-500">Estimated Cost:</span>
          <div className="text-right">
             <div className="text-2xl font-bold text-slate-900">{calculatedCost.toFixed(1)} TC</div>
             {isUrgent && <div className="text-sm text-slate-500">+ ¥{urgentFee} Fee</div>}
          </div>
        </div>
        <button 
          onClick={handlePostTask}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          Post Task
        </button>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="pb-24 pt-4 px-4">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img src={user.avatar} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" alt="Profile" />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white">
            <Shield size={12} fill="currentColor" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-md font-bold">Reputation: {user.reputationScore}</span>
             <span className="text-slate-400 text-xs">ID: {user.id}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase">
            <Wallet size={14} /> Time Asset
          </div>
          <div className={`text-2xl font-bold ${user.tcBalance < 0 ? 'text-red-500' : 'text-slate-900'}`}>
            {user.tcBalance.toFixed(1)} TC
          </div>
          <div className="text-xs text-slate-400 mt-1">≈ {Math.abs(user.tcBalance)}h labor</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase">
            <TrendingUp size={14} /> Cash Asset
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            ¥{user.creditBalance.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Available</div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={18} fill="currentColor" className="text-yellow-300" />
            <span className="font-bold text-yellow-300">Premium Member</span>
          </div>
          <p className="text-sm opacity-90 mb-4 pr-10">No transaction fees, view nearby high-rep users, and double daily limits.</p>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform">
            Upgrade for ¥19.9/mo
          </button>
        </div>
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <Crown size={140} />
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
         <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
               <Camera size={16} />
             </div>
             <span className="text-slate-700 font-medium">Verify Identity</span>
           </div>
           <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full">Verified</span>
         </div>
         <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
               <Clock size={16} />
             </div>
             <span className="text-slate-700 font-medium">Transaction History</span>
           </div>
         </div>
         <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
               <Settings size={16} />
             </div>
             <span className="text-slate-700 font-medium">Settings</span>
           </div>
         </div>
         <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 text-red-500">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
               <LogOut size={16} />
             </div>
             <span className="font-medium">Log Out</span>
           </div>
         </div>
      </div>
    </div>
  );

  const MessagesView = () => (
    <div className="flex flex-col items-center justify-center h-screen pb-20 text-slate-400">
      <MessageCircle size={48} className="mb-4 text-slate-200" />
      <p>No messages yet.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'post' && <PostView />}
      {activeTab === 'profile' && <ProfileView />}
      {activeTab === 'messages' && <MessagesView />}

      {/* Global Security / SOS Button (always visible on market/progress) */}
      <div className="fixed bottom-24 right-4 z-40">
        <button className="bg-white p-3 rounded-full shadow-lg border border-slate-200 text-slate-400 hover:text-red-500 transition-colors">
          <ShieldCheck size={24} />
        </button>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}