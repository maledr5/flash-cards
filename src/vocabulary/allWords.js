import data from "./data.csv"

const words = data.map((word) => ({
    ...word,
    translations: word.translations.split(',')
}))
console.log('words', words)

const getRandomWord = (categoryFilter) => {
    const filteredWords = categoryFilter === 'all' ? words : words.filter(word => word.category === categoryFilter)
    const randomNum = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[randomNum]
}

const getRandomPlural = (word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular
}

const getCategories = () => {
    const allCategories = words.map(word => word.category)
    return ['all', ...new Set(allCategories)]
}

export { words, getRandomWord, getRandomPlural, getCategories}