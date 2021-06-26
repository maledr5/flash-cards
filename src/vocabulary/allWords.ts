// @ts-ignore
import data from "./data.csv"

type CSVWord = {
    needsPractice: boolean
    type: string
    pronoun: string
    singular: string
    plural: string
    translations: string
    categories: string
}

type Word = {
    needsPractice: boolean
    type: string
    pronoun: string
    singular: string
    plural: string
    translations: string[]
    categories: string[]
}

const words: Word[] = data.map((word: CSVWord) => ({
    ...word,
    translations: word.translations.split(',').map(translation => translation.trim()),
    categories: word.categories.split(',').map(category => category.trim())
}))

const ALL_CATEGORIES = 'All Categories'
const ALL_TYPES = 'All Types'

const filterByCategory = (categoryFilter: string) => {
    return words.filter(word => {
        return word.categories.find(category => category === categoryFilter)
    })
}

const getRandomWord = (categoryFilter: string, TypeFilter: string) => {
    let filteredByCategory = categoryFilter === ALL_CATEGORIES ? words : filterByCategory(categoryFilter)
    const filteredWords = TypeFilter === ALL_TYPES ? filteredByCategory : filteredByCategory.filter(word => word.type === TypeFilter)
    const randomNum = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[randomNum]
}

const getRandomPlural = (word: Word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular
}

const getCategories = () => {
    const allCategories: string[] = []
    words.map(word => {
        allCategories.push(...word.categories)
    })
    const uniqueCategories = Array.from(new Set(allCategories))
    return [ALL_CATEGORIES, ...uniqueCategories]
}

const getTypes = () => {
    const allTypes = words.map((word) => word.type)
    const uniqueTypes = Array.from(new Set(allTypes))
    return [ALL_TYPES, ...uniqueTypes]
}

export {
    words,
    ALL_CATEGORIES,
    ALL_TYPES,
    getRandomWord,
    getRandomPlural,
    getCategories,
    getTypes
}