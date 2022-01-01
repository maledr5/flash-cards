import { Word } from './wordParser'

const ALL_CATEGORIES = 'All Categories'
const ALL_TYPES = 'All Types'

const filterByCategory = (wordList: Word[], categoryFilter: string) => {
    return wordList.filter(word => {
        return word.categories.find(category => category === categoryFilter)
    })
}

const getRandomWord = (wordList: Word[], categoryFilter: string, TypeFilter: string) => {
    let filteredByCategory = categoryFilter === ALL_CATEGORIES ? wordList : filterByCategory(wordList, categoryFilter)
    const filteredWords = TypeFilter === ALL_TYPES ? filteredByCategory : filteredByCategory.filter(word => word.type === TypeFilter)
    const randomNum = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[randomNum]
}

const getRandomPlural = (word: Word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular
}

const getCategories = (wordList: Word[]) => {
    const allCategories: string[] = []
    wordList.map(word => {
        allCategories.push(...word.categories)
    })
    const uniqueCategories = Array.from(new Set(allCategories))
    return [ALL_CATEGORIES, ...uniqueCategories]
}

const getTypes = (wordList: Word[]) => {
    const allTypes = wordList.map((word) => word.type)
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
