import Chance from 'chance';

const chance = new Chance();

const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

const categories = [
  'абстракция',
  'пейзаж',
  'портрет',
  'живопись маслом',
];

const generateProducts = (numProducts) => {
  return Array.from({ length: numProducts }, () => ({
    id: chance.guid(),
    name: chance.word({ syllables: 2 }),
    description: chance.sentence({ words: 3 }),
    color: chance.pickone(colors),
    price: chance.integer({ min: 100, max: 9999 }),
    rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
    imageUrl: `https://picsum.photos/200/300?random=${chance.integer({ min: 1, max: 100 })}`,
    category: chance.pickone(categories),
  }));
};

export const products = generateProducts(20);
