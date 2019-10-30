export const getRandomIndexFromArray = function (array) {
  return Math.floor(Math.random() * (array.length - 1))
}

export const capitalizeWords = function (string) {
  const words = string.replace(/_/g, ' ').split(' ')
  const cleanedWords = []

  for (let word of words) {
    cleanedWords.push(word[0].toUpperCase() + word.slice(1))
  }
  return cleanedWords.join(' ')
}
