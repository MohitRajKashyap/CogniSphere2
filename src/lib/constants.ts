import { Code, Palette, BrainCircuit, Database, Mic, Users, Mountain, Bot } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const SKILLS = [
  { name: 'Python', icon: Code },
  { name: 'UI/UX Design', icon: Palette },
  { name: 'Machine Learning', icon: BrainCircuit },
  { name: 'SQL & Databases', icon: Database },
  { name: 'Public Speaking', icon: Mic },
  { name: 'Team Management', icon: Users },
  { name: 'Prompt Engineering', icon: Bot },
  { name: 'Personal Growth', icon: Mountain },
] as const;

export type SkillName = (typeof SKILLS)[number]['name'];

export interface Skill {
  name: SkillName;
  icon: LucideIcon;
}

export type User = {
  id: number;
  name: string;
  credits: number;
  rating: number;
  avatarUrl: string;
  teaches: SkillName[];
  learns: SkillName[];
};

export const USERS: User[] = [
  {
    id: 1,
    name: 'Alex',
    credits: 120,
    rating: 4.8,
    avatarUrl: 'https://picsum.photos/seed/user1/200/200',
    teaches: ['Python', 'Machine Learning'],
    learns: ['UI/UX Design', 'Public Speaking'],
  },
  {
    id: 2,
    name: 'Brian',
    credits: 85,
    rating: 4.5,
    avatarUrl: 'https://picsum.photos/seed/user2/200/200',
    teaches: ['UI/UX Design'],
    learns: ['Python', 'SQL & Databases'],
  },
  {
    id: 3,
    name: 'Chloe',
    credits: 200,
    rating: 4.9,
    avatarUrl: 'https://picsum.photos/seed/user3/200/200',
    teaches: ['SQL & Databases', 'Team Management'],
    learns: ['Machine Learning', 'Prompt Engineering'],
  },
  {
    id: 4,
    name: 'David',
    credits: 50,
    rating: 4.2,
    avatarUrl: 'https://picsum.photos/seed/user4/200/200',
    teaches: ['Public Speaking', 'Personal Growth'],
    learns: ['Python', 'Team Management'],
  },
  {
    id: 5,
    name: 'Emily',
    credits: 150,
    rating: 4.7,
    avatarUrl: 'https://picsum.photos/seed/user5/200/200',
    teaches: ['Prompt Engineering'],
    learns: ['UI/UX Design', 'Personal Growth'],
  },
];

export const LOGGED_IN_USER = USERS[0];
