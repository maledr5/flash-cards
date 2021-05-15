import nouns from "./nouns.json"
import adjectives from "./adjectives.json"
import verbs from "./verbs.json"
import questions from "./questions.json"
import skills from "./skills.json"
import adverbs from "./adverbs.json"

const words =  [...nouns, ...adjectives, ...verbs, ...questions, ...skills, adverbs]

const getRandomWord = (previousWord) => {
    const randomNum = Math.floor(Math.random() * words.length)
    return words[randomNum]
}

const getRandomPlural = (word) => {
    const isPlural = Math.floor(Math.random() * 2)
    return isPlural && word.type === 'noun' ? word.plural : word.singular
}

export { words, getRandomWord, getRandomPlural}