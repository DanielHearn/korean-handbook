export const getRandomIndexFromArray = function (array) {
  return Math.floor(Math.random() * (array.length - 1));
};

export const capitalizeWords = function (string) {
  const words = string.replace(/_/g, ' ').split(' ');
  const cleanedWords = [];

  for (let word of words) {
    cleanedWords.push(word[0].toUpperCase() + word.slice(1));
  }
  return cleanedWords.join(' ');
};

export const shuffleArray = function (array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const generateTabs = (mobile = false, id = 'top_100') => {
  let tabs = [
    {
      name: 'Learn',
      slug: 'info',
      url: `/content/${id}/info`,
      icon: 'list',
      description: 'Learn new words from categories',
    },
    {
      name: 'Random',
      slug: 'random',
      url: `/content/${id}/random`,
      icon: 'shuffle',
      description: 'Learn random words',
    },
    {
      name: 'Match',
      slug: 'match',
      url: `/content/${id}/match`,
      icon: 'compare_arrows',
      description: 'Match Korean words to English',
    },
    {
      name: 'Test',
      slug: 'test',
      url: `/content/${id}/test`,
      icon: 'school',
      description: 'Spell Korean words',
    },
    {
      name: 'Type',
      slug: 'typing',
      url: `/content/${id}/typing`,
      icon: 'keyboard_alt',
      description: 'Practice typing Korean words',
    },
  ];

  if (mobile) {
    tabs = [{ name: 'Home', slug: 'home', url: `/`, icon: 'home' }, ...tabs];
  }

  return tabs;
};
