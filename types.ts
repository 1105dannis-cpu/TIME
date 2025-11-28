export enum CurrencyType {
  TC = 'Time Coin',
  RMB = 'Credits/RMB'
}

export enum TaskType {
  GENERAL = 'General', // Weight 1.0
  SKILLED = 'Skilled', // Weight 1.5 - 2.0
  EXPERT = 'Expert',   // Weight 3.0
  CORPORATE = 'Corporate' // Sponsored
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  tcBalance: number; // Can be negative (Debt Hook)
  creditBalance: number;
  isPremium: boolean;
  reputationScore: number; // 0-100
  isVerified: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  skillWeight: number; // Multiplier
  durationHours: number;
  rewardTC: number;
  costRMB: number; // Material cost or tips
  location: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  isUrgent: boolean; // 5 RMB Paid feature
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface SkillCategory {
  id: string;
  name: string;
  weight: number;
  emoji: string;
}