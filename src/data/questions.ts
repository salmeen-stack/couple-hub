import { Question, Achievement } from '@/types'

export const guessQuestions: Question[] = [
  { id: 'g1', category: 'Food', question: 'What is my favorite pizza topping?', type: 'guess' },
  { id: 'g2', category: 'Food', question: 'What is my go-to comfort food?', type: 'guess' },
  { id: 'g3', category: 'Movies', question: 'What is my all-time favorite movie?', type: 'guess' },
  { id: 'g4', category: 'Movies', question: 'Which movie genre do I dislike the most?', type: 'guess' },
  { id: 'g5', category: 'Music', question: 'What is my favorite song of all time?', type: 'guess' },
  { id: 'g6', category: 'Music', question: 'Which artist do I listen to most often?', type: 'guess' },
  { id: 'g7', category: 'Travel', question: 'What is my dream travel destination?', type: 'guess' },
  { id: 'g8', category: 'Travel', question: 'Which place have I visited that I loved most?', type: 'guess' },
  { id: 'g9', category: 'Childhood', question: 'What was my favorite childhood toy?', type: 'guess' },
  { id: 'g10', category: 'Childhood', question: 'What did I want to be when I grew up?', type: 'guess' },
  { id: 'g11', category: 'Future Dreams', question: 'What is one thing I want to achieve in the next year?', type: 'guess' },
  { id: 'g12', category: 'Future Dreams', question: 'Where do I see us in 5 years?', type: 'guess' },
  { id: 'g13', category: 'Romance', question: 'What is my favorite thing about our relationship?', type: 'guess' },
  { id: 'g14', category: 'Romance', question: 'What is my favorite memory of us together?', type: 'guess' },
  { id: 'g15', category: 'Family', question: 'Which family member am I closest to?', type: 'guess' },
  { id: 'g16', category: 'Family', question: 'What family tradition do I love most?', type: 'guess' },
  { id: 'g17', category: 'Hobbies', question: 'What is my favorite hobby?', type: 'guess' },
  { id: 'g18', category: 'Hobbies', question: 'What new skill do I want to learn?', type: 'guess' },
  { id: 'g19', category: 'Funny', question: 'What is the weirdest food combination I enjoy?', type: 'guess' },
  { id: 'g20', category: 'Funny', question: 'What is my biggest irrational fear?', type: 'guess' },
]

export const dailyQuestions: Question[] = [
  { id: 'd1', category: 'Daily', question: 'What made you smile today?', type: 'daily' },
  { id: 'd2', category: 'Daily', question: 'What are you grateful for today?', type: 'daily' },
  { id: 'd3', category: 'Daily', question: 'What is your favorite memory of us?', type: 'daily' },
  { id: 'd4', category: 'Daily', question: 'What do you appreciate most about your partner today?', type: 'daily' },
  { id: 'd5', category: 'Daily', question: 'Where should we travel next?', type: 'daily' },
  { id: 'd6', category: 'Daily', question: 'What is something you want to do together this weekend?', type: 'daily' },
  { id: 'd7', category: 'Daily', question: 'What made you think of me today?', type: 'daily' },
  { id: 'd8', category: 'Daily', question: 'What is a goal you want to accomplish this week?', type: 'daily' },
  { id: 'd9', category: 'Daily', question: 'What is your favorite thing about our relationship?', type: 'daily' },
  { id: 'd10', category: 'Daily', question: 'What would make today perfect?', type: 'daily' },
]

export const truthQuestions: Question[] = [
  { id: 't1', category: 'Cute', question: "What's your favorite thing about me?", type: 'truth' },
  { id: 't2', category: 'Cute', question: "When did you first know you liked me?", type: 'truth' },
  { id: 't3', category: 'Cute', question: "What's my best quality?", type: 'truth' },
  { id: 't4', category: 'Romantic', question: "What's your happiest memory with me?", type: 'truth' },
  { id: 't5', category: 'Romantic', question: "What do you love most about our relationship?", type: 'truth' },
  { id: 't6', category: 'Romantic', question: "What's something you've always wanted to tell me but haven't?", type: 'truth' },
  { id: 't7', category: 'Funny', question: "What's the most embarrassing thing I've done?", type: 'truth' },
  { id: 't8', category: 'Funny', question: "What's a weird habit I have that you secretly like?", type: 'truth' },
  { id: 't9', category: 'Deep', question: "What's your biggest dream for us?", type: 'truth' },
  { id: 't10', category: 'Deep', question: "What's one thing you've never told anyone else?", type: 'truth' },
]

export const dareQuestions: Question[] = [
  { id: 'da1', category: 'Cute', question: 'Give your partner a hug for one minute.', type: 'dare' },
  { id: 'da2', category: 'Cute', question: 'Send a voice message saying three things you love about your partner.', type: 'dare' },
  { id: 'da3', category: 'Cute', question: 'Hold hands for 5 minutes without letting go.', type: 'dare' },
  { id: 'da4', category: 'Romantic', question: 'Give your partner a compliment about their appearance.', type: 'dare' },
  { id: 'da5', category: 'Romantic', question: 'Plan a surprise date for this week.', type: 'dare' },
  { id: 'da6', category: 'Romantic', question: 'Write a love note and hide it for your partner to find.', type: 'dare' },
  { id: 'da7', category: 'Funny', question: 'Dance to your favorite song together.', type: 'dare' },
  { id: 'da8', category: 'Funny', question: 'Take a funny selfie together.', type: 'dare' },
  { id: 'da9', category: 'Funny', question: 'Do your best impression of your partner.', type: 'dare' },
  { id: 'da10', category: 'Deep', question: 'Share a childhood memory you rarely talk about.', type: 'dare' },
]

export const wouldYouRatherQuestions: Question[] = [
  { id: 'w1', category: 'Travel', question: 'Would you rather spend a week at the beach or in the mountains?', type: 'would-you-rather' },
  { id: 'w2', category: 'Food', question: 'Would you rather only eat pizza for a month or only eat burgers for a month?', type: 'would-you-rather' },
  { id: 'w3', category: 'Lifestyle', question: 'Would you rather live in a city or in the countryside?', type: 'would-you-rather' },
  { id: 'w4', category: 'Activities', question: 'Would you rather go to a concert or a movie night?', type: 'would-you-rather' },
  { id: 'w5', category: 'Travel', question: 'Would you rather travel to Europe or Asia?', type: 'would-you-rather' },
  { id: 'w6', category: 'Food', question: 'Would you rather cook dinner together or order takeout?', type: 'would-you-rather' },
  { id: 'w7', category: 'Lifestyle', question: 'Would you rather have a quiet night in or a night out with friends?', type: 'would-you-rather' },
  { id: 'w8', category: 'Activities', question: 'Would you rather go hiking or go to the beach?', type: 'would-you-rather' },
  { id: 'w9', category: 'Future', question: 'Would you rather know the future or change the past?', type: 'would-you-rather' },
  { id: 'w10', category: 'Relationship', question: 'Would you rather always say what you think or never speak again?', type: 'would-you-rather' },
]

export const spinWheelOptions = [
  { id: 'sw1', label: 'Truth', icon: '💬' },
  { id: 'sw2', label: 'Dare', icon: '🎯' },
  { id: 'sw3', label: 'Compliment', icon: '💕' },
  { id: 'sw4', label: 'Kiss', icon: '😘' },
  { id: 'sw5', label: 'Memory Question', icon: '🧠' },
  { id: 'sw6', label: 'Would You Rather', icon: '🤔' },
  { id: 'sw7', label: 'Dance Challenge', icon: '💃' },
  { id: 'sw8', label: 'Selfie Challenge', icon: '📸' },
  { id: 'sw9', label: 'Movie Night', icon: '🎬' },
  { id: 'sw10', label: 'Double XP', icon: '⭐' },
]

export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Win', description: 'Complete your first game', icon: '🏆', requirement: 1 },
  { id: 'a2', title: '30-Day Streak', description: 'Maintain a 30-day love streak', icon: '❤️', requirement: 30 },
  { id: 'a3', title: 'Dare Devil', description: 'Complete 50 dares', icon: '😂', requirement: 50 },
  { id: 'a4', title: 'Memory Master', description: 'Answer 20 memory questions correctly', icon: '🧠', requirement: 20 },
  { id: 'a5', title: 'Guess Champion', description: 'Guess correctly 30 times', icon: '🎯', requirement: 30 },
  { id: 'a6', title: 'Love Letter', description: 'Send 50 love notes', icon: '💌', requirement: 50 },
  { id: 'a7', title: 'Memory Keeper', description: 'Upload 25 memories', icon: '📸', requirement: 25 },
  { id: 'a8', title: 'Level 20', description: 'Reach couple level 20', icon: '🔥', requirement: 20 },
  { id: 'a9', title: 'Perfect Match', description: 'Match answers 10 times in Would You Rather', icon: '💕', requirement: 10 },
  { id: 'a10', title: 'Legendary', description: 'Reach level 50', icon: '👑', requirement: 50 },
]
