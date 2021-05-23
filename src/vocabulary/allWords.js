import data from "./data.csv"

const words = data.map((word) => ({
    ...word,
    translations: word.translations.split(',')
}))
console.log('words', words)

const getRandomWord = (previousWord) => {
    const randomNum = Math.floor(Math.random() * words.length)
    return words[randomNum]
}

const getRandomPlural = (word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular
}

export { words, getRandomWord, getRandomPlural}