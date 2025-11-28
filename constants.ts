import { SkillCategory, Task, TaskType, User } from './types';

export const INITIAL_USER: User = {
  id: 'u1',
  name: 'New User',
  avatar: 'https://picsum.photos/200/200',
  tcBalance: -2.0, // The "Hook": Start with debt
  creditBalance: 0,
  isPremium: false,
  reputationScore: 100,
  isVerified: true,
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: '1', name: 'Dog Walking', weight: 1.0, emoji: '🐕' },
  { id: '2', name: 'Delivery Pickup', weight: 0.8, emoji: '📦' },
  { id: '3', name: 'Cleaning', weight: 1.2, emoji: '🧹' },
  { id: '4', name: 'Cooking', weight: 1.5, emoji: '🍳' },
  { id: '5', name: 'Tutoring (General)', weight: 2.0, emoji: '📚' },
  { id: '6', name: 'IELTS/Coding', weight: 3.0, emoji: '💻' },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Starbucks Brand Promotion',
    description: 'Go to the new Starbucks at City Mall, take a photo, and post on RedBook.',
    type: TaskType.CORPORATE,
    skillWeight: 1.0,
    durationHours: 0.5,
    rewardTC: 0.5,
    costRMB: 0,
    location: 'City Mall, Zone A',
    author: { name: 'Starbucks Official', avatar: 'https://picsum.photos/100/100?random=1', isVerified: true },
    isUrgent: true,
    status: 'OPEN',
  },
  {
    id: 't2',
    title: 'Walk my Golden Retriever',
    description: 'Need someone to walk Goldie for an hour. She is friendly but pulls on the leash.',
    type: TaskType.GENERAL,
    skillWeight: 1.0,
    durationHours: 1,
    rewardTC: 1.0,
    costRMB: 0,
    location: 'Greenwood Park',
    author: { name: 'Alice Chen', avatar: 'https://picsum.photos/100/100?random=2', isVerified: true },
    isUrgent: false,
    status: 'OPEN',
  },
  {
    id: 't3',
    title: 'Teach me React Basics',
    description: 'I am a student needing help with frontend concepts. 1 hour session.',
    type: TaskType.EXPERT,
    skillWeight: 3.0,
    durationHours: 1,
    rewardTC: 3.0,
    costRMB: 0,
    location: 'University Library / Online',
    author: { name: 'Bob Smith', avatar: 'https://picsum.photos/100/100?random=3', isVerified: false },
    isUrgent: false,
    status: 'OPEN',
  },
];