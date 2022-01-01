import { Word } from './wordParser'

const ALL_CATEGORIES = 'All Categories'
const ALL_TYPES = 'All Types'

const __filterByCategory = (wordList: Word[], categoryFilter: string) => {
    if (categoryFilter === ALL_CATEGORIES) return wordList
    return wordList.filter(word => word.categories.find(category => category === categoryFilter))
}

const __filterByType = (wordList: Word[], typeFilter: string) => {
    if (typeFilter === ALL_TYPES) return wordList
    return wordList.filter(word => word.type === typeFilter )
}

const getRandomWord = (wordList: Word[], categoryFilter: string, typeFilter: string) => {
    let filteredByCategory = __filterByCategory(wordList, categoryFilter)
    const filteredWords = __filterByType(filteredByCategory, typeFilter)
    const randomNum = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[randomNum]
}

const getRandomPlural = (word: Word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular
}

const getCategories = (wordList: Word[], selectedType: string) => {
    let filteredWords = wordList
    if (selectedType !== ALL_TYPES) {
        filteredWords = __filterByType(wordList, selectedType)
    }
    const allCategories: string[] = []
    filteredWords.map(word => {
        allCategories.push(...word.categories)
    })
    const uniqueCategories = Array.from(new Set(allCategories))
    return [ALL_CATEGORIES, ...uniqueCategories]
}

const getTypes = (wordList: Word[], selectedCategory: string) => {
    let filteredWords = wordList
    if (selectedCategory !== ALL_CATEGORIES) {
        filteredWords = __filterByCategory(wordList, selectedCategory)
    }
    const allTypes = filteredWords.map((word) => word.type)
    const uniqueTypes = Array.from(new Set(allTypes))
    return [ALL_TYPES, ...uniqueTypes]
}

export {
    ALL_CATEGORIES,
    ALL_TYPES,
    getRandomWord,
    getRandomPlural,
    getCategories,
    getTypes
}
