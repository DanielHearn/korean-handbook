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

export const generateTabs = (mobile = false, id = 'conjunctions') => {
  let tabs = [
    {
      name: 'Learn',
      slug: 'info',
      url: `/content/${id}/info`,
      icon: 'list',
      description: 'Learn new words',
    },
    {
      name: 'Random',
      slug: 'random',
      url: `/content/${id}/random`,
      icon: 'shuffle',
      description: 'Learn words and test your knowledge',
    },
    {
      name: 'Match',
      slug: 'match',
      url: `/content/${id}/match`,
      icon: 'compare_arrows',
      description: 'Watch Korean words to their translation',
    },
    {
      name: 'Test',
      slug: 'test',
      url: `/content/${id}/test`,
      icon: 'school',
      description: 'Test your knowledge of Korean words',
    },
  ];

  if (mobile) {
    tabs = [{ name: 'Home', slug: 'home', url: `/`, icon: 'home' }, ...tabs];
  }

  return tabs;
};
