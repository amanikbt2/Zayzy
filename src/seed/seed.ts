import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Game from '../models/Game';
import GameContent from '../models/GameContent';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pocket_arcade';

const seedGames = [
  {
    gameId: 'bubble-shooter',
    slug: 'bubble-shooter',
    title: 'Bubble Shooter',
    description: 'Aim, shoot, and pop matching colored bubbles in this classic arcade puzzle challenge!',
    category: 'Puzzle',
    engineType: 'bubble-shooter',
    version: '1.0.0',
    packageVersion: '1.0.0',
    contentVersion: 1,
    isPublished: true,
    isFeatured: true,
    isNew: true,
    downloadSize: '1.8 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'sweet-garden',
    slug: 'sweet-garden',
    title: 'Sweet Garden',
    description: 'Match delicious fruits, berries, and blooming flowers to clear board goals in this sweet garden match-3 adventure!',
    category: 'Match-3',
    engineType: 'match-3',
    version: '1.0.0',
    packageVersion: '1.0.0',
    contentVersion: 1,
    isPublished: true,
    isFeatured: true,
    isNew: false,
    downloadSize: '2.1 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'sliding-puzzle',
    slug: 'sliding-puzzle',
    title: 'Sliding Puzzle',
    description: 'Slide numbered tiles into place to form ordered grids. Fast-paced, brain-teasing tile sliding fun!',
    category: 'Brain',
    engineType: 'puzzle',
    version: '1.0.0',
    packageVersion: '1.0.0',
    contentVersion: 1,
    isPublished: true,
    isFeatured: true,
    isNew: true,
    downloadSize: '1.2 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'cosmic-pop',
    slug: 'cosmic-pop',
    title: 'Cosmic Pop',
    description: 'Pop galaxy bubbles across neon nebula levels with cosmic combo boosts!',
    category: 'Arcade',
    engineType: 'bubble-shooter',
    version: '1.1.0',
    packageVersion: '1.1.0',
    contentVersion: 2,
    isPublished: true,
    isFeatured: true,
    isNew: true,
    downloadSize: '1.9 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'fruit-blast',
    slug: 'fruit-blast',
    title: 'Fruit Blast',
    description: 'Blast juicy tropical fruits in cascade match-3 combos to unlock high scores!',
    category: 'Match-3',
    engineType: 'match-3',
    version: '1.2.0',
    packageVersion: '1.2.0',
    contentVersion: 2,
    isPublished: true,
    isFeatured: false,
    isNew: true,
    downloadSize: '2.4 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'number-slide',
    slug: 'number-slide',
    title: 'Number Slide 15',
    description: 'Classic 15-tile numerical slider challenge. Test your speed and strategy!',
    category: 'Brain',
    engineType: 'puzzle',
    version: '1.0.1',
    packageVersion: '1.0.1',
    contentVersion: 1,
    isPublished: true,
    isFeatured: false,
    isNew: false,
    downloadSize: '1.1 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116211223-48a12725836c?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1516116211223-48a12725836c?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'candy-crush-land',
    slug: 'candy-crush-land',
    title: 'Candy Kingdom',
    description: 'Embark on a sugary sweet match-3 saga across 5 challenging candy levels!',
    category: 'Match-3',
    engineType: 'match-3',
    version: '1.3.0',
    packageVersion: '1.3.0',
    contentVersion: 3,
    isPublished: true,
    isFeatured: true,
    isNew: true,
    downloadSize: '2.6 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'gem-match-legend',
    slug: 'gem-match-legend',
    title: 'Gem Match Legend',
    description: 'Match sparkling diamonds, rubies, and emeralds in ancient temple ruins!',
    category: 'Match-3',
    engineType: 'match-3',
    version: '1.0.0',
    packageVersion: '1.0.0',
    contentVersion: 1,
    isPublished: true,
    isFeatured: false,
    isNew: true,
    downloadSize: '2.0 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'picture-puzzle-pro',
    slug: 'picture-puzzle-pro',
    title: 'Picture Grid Pro',
    description: 'Solve brain-bending 3x3 and 4x4 image sliding puzzles with step tracking!',
    category: 'Brain',
    engineType: 'puzzle',
    version: '1.1.0',
    packageVersion: '1.1.0',
    contentVersion: 2,
    isPublished: true,
    isFeatured: false,
    isNew: false,
    downloadSize: '1.5 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=120&q=80',
  },
  {
    gameId: 'bubble-blast-mania',
    slug: 'bubble-blast-mania',
    title: 'Bubble Blast Mania',
    description: 'Hyper-casual bubble shooter with fast popping gameplay and neon visuals!',
    category: 'Arcade',
    engineType: 'bubble-shooter',
    version: '1.0.2',
    packageVersion: '1.0.2',
    contentVersion: 2,
    isPublished: true,
    isFeatured: true,
    isNew: true,
    downloadSize: '2.2 MB',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    iconUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=120&q=80',
  },
];

const seedContent = [
  {
    gameId: 'bubble-shooter',
    version: 1,
    configuration: {
      rows: 10,
      cols: 8,
      bubbleRadius: 18,
    },
    levels: [
      { level: 1, colors: ['#FF4757', '#2ED573', '#1E90FF'], rows: 4, moves: 25, targetScore: 500 },
      { level: 2, colors: ['#FF4757', '#2ED573', '#1E90FF', '#FFA502'], rows: 5, moves: 22, targetScore: 800 },
      { level: 3, colors: ['#FF4757', '#2ED573', '#1E90FF', '#FFA502'], rows: 6, moves: 20, targetScore: 1200 },
      { level: 4, colors: ['#FF4757', '#2ED573', '#1E90FF', '#FFA502', '#9B59B6'], rows: 6, moves: 18, targetScore: 1600 },
      { level: 5, colors: ['#FF4757', '#2ED573', '#1E90FF', '#FFA502', '#9B59B6'], rows: 7, moves: 16, targetScore: 2200 },
    ],
    assetsMetadata: {},
    audioMetadata: {},
    checksum: 'bs_v1_checksum_1001',
    published: true,
  },
  {
    gameId: 'sweet-garden',
    version: 1,
    configuration: {
      gridRows: 8,
      gridCols: 8,
    },
    levels: [
      { level: 1, items: ['apple', 'berry', 'flower'], maxMoves: 25, targetScore: 1000 },
      { level: 2, items: ['apple', 'berry', 'flower', 'grape'], maxMoves: 22, targetScore: 1800 },
      { level: 3, items: ['apple', 'berry', 'flower', 'grape', 'sunflower'], maxMoves: 20, targetScore: 3000 },
      { level: 4, items: ['apple', 'berry', 'flower', 'grape', 'sunflower'], maxMoves: 18, targetScore: 4500 },
      { level: 5, items: ['apple', 'berry', 'flower', 'grape', 'sunflower'], maxMoves: 15, targetScore: 6500 },
    ],
    assetsMetadata: {},
    audioMetadata: {},
    checksum: 'sg_v1_checksum_1002',
    published: true,
  },
  {
    gameId: 'sliding-puzzle',
    version: 1,
    configuration: {
      defaultGridSize: 3,
    },
    levels: [
      { level: 1, gridSize: 3, timeLimit: 120, maxMoves: 50 },
      { level: 2, gridSize: 3, timeLimit: 90, maxMoves: 40 },
      { level: 3, gridSize: 4, timeLimit: 180, maxMoves: 80 },
      { level: 4, gridSize: 4, timeLimit: 150, maxMoves: 70 },
      { level: 5, gridSize: 4, timeLimit: 120, maxMoves: 60 },
    ],
    assetsMetadata: {},
    audioMetadata: {},
    checksum: 'sp_v1_checksum_1003',
    published: true,
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully.');

    await Game.deleteMany({});
    await GameContent.deleteMany({});
    console.log('Cleared existing Games & GameContent.');

    await Game.insertMany(seedGames);
    console.log(`Seeded ${seedGames.length} games.`);

    await GameContent.insertMany(seedContent);
    console.log(`Seeded ${seedContent.length} game content packages.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}
