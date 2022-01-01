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

export type Word = {
    needsPractice: boolean
    type: string
    pronoun: string
    singular: string
    plural: string
    translations: string[]
    categories: string[]
}

export const germanWords: Word[] = data.map((word: CSVWord) => ({
    ...word,
    translations: word.translations.split(',').map(translation => translation.trim()),
    categories: word.categories.split(',').map(category => category.trim())
}))

export const translatedWords: Word[] = data.map((word: CSVWord) => ({
    ...word,
    singular: word.translations,
    plural: null,
    translations: [word.singular],
    categories: word.categories.split(',').map(category => category.trim())
}))
