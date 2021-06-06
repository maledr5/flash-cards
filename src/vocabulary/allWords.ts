// @ts-ignore
import data from "./data.csv"

type CSVWord = {
    needsPractice: boolean
    type: string
    pronoun: string
    singular: string
    plural: string
    translations: string
    category: string
}

type Word = {
    needsPractice: boolean
    type: string
    pronoun: string
    singular: string
    plural: string
    translations: string[]
    category: string
}

const words: Word[] = data.map((word: CSVWord) => ({
    ...word,
    translations: word.translations.split(',')
}))

const getRandomWord = (categoryFilter: string, TypeFilter: string) => {
    let filteredByCategory = categoryFilter === 'all' ? words : words.filter(word => word.category === categoryFilter)
    const filteredWords = TypeFilter === 'all' ? filteredByCategory : filteredByCategory.filter(word => word.type === TypeFilter)
    const randomNum = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[randomNum]
}

const getRandomPlural = (word: Word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular
}

const getCategories = () => {
    const allCategories = words.map(word => word.category)
    const uniqueCategories = Array.from(new Set(allCategories))
    return ['all', ...uniqueCategories]
}

const getTypes = () => {
    const allTypes = words.map((word) => word.type)
    const uniqueTypes = Array.from(new Set(allTypes))
    return ['all', ...uniqueTypes]
}

export { words, getRandomWord, getRandomPlural, getCategories, getTypes }