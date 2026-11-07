// Edit this file to personalize the site. Replace placeholders with your own details.
export const profile = {
  name: 'yozi55',
  role: "Don't care about what others think.",
  headline: ['扣肉'],
  intro: '一个爱玩的初生，喜欢折腾各种新鲜事物，热衷于探索未知领域。',
  location: '柳州, 中国',
  email: '2359690388xc@gmail.com',
  availability: 'Open to interesting conversations',
  about: [
    '喜欢玩游戏，编程',
    '平时还喜欢玩滑板，骑行',
  ],
  socials: [
    { label: 'Telegram', url: 'https://t.me/niaozda' },
  ],
}

export type Project = {
  number: string
  title: string
  category: string
  year: string
  description: string
  stack: string[]
  tone: 'lime' | 'blue' | 'pink'
  link?: string
  details: string
}

// Replace these sample entries with real projects. No fictional achievements are included.
export const projects: Project[] = [
  {
    number: '01',
    title: 'A small beginning',
    category: 'PERSONAL / WEB',
    year: '2026',
    description: 'A first step into making things for the open web.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    tone: 'lime',
    details: 'A place to collect experiments, ideas, and small things worth sharing. Add a real project description here when you are ready.',
  },
  {
    number: '02',
    title: 'Learning in public',
    category: 'NOTES / PROCESS',
    year: '2026',
    description: 'An evolving record of questions, discoveries, and useful notes.',
    stack: ['Writing', 'Research'],
    tone: 'blue',
    details: 'A personal knowledge garden. Describe what you explored, what you learned, and what you would improve next.',
  },
  {
    number: '03',
    title: 'Next, something new',
    category: 'EXPERIMENT',
    year: 'IN PROGRESS',
    description: 'The next idea is still taking shape.',
    stack: ['Exploration'],
    tone: 'pink',
    details: 'Use this space for an experiment that is currently in progress. You can also remove this entry from src/config.ts.',
  },
]