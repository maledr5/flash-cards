import React, { ChangeEvent, FC, FormEvent } from "react";
import {
    getRandomWord,
    getRandomPlural,
    getCategories,
    getTypes,
    ALL_CATEGORIES,
    ALL_TYPES
} from "./vocabulary/wordHelper";
import {useEffect, useRef, useState} from "react";
import { Word } from "./vocabulary/wordParser";

type VocabularyProps = {
    wordList: Word[]
}

const Vocabulary: FC<VocabularyProps> = ({wordList}) => {
    const [feedback, setFeedback] = useState("Type your answer")
    const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
    const [selectedType, setSelectedType] = useState(ALL_TYPES)
    const [randomWord, setRandomWord] = useState(getRandomWord(wordList, selectedCategory, selectedType))
    const translations = randomWord.translations

    useEffect(()=>{
        setRandomWord(getRandomWord(wordList, selectedCategory, selectedType))
    },[selectedCategory, selectedType, wordList])

    const answerInput = useRef<HTMLInputElement>(null)

    const isAnswerCorrect = (answer: string) => {
        if(answer === "") return false
        return translations.some( (translation => {
            return translation.toLowerCase().trim() === answer.toLowerCase().trim()
        }))
    }

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (answerInput && answerInput.current) {
            const answer = answerInput.current.value.trim() || ""
            isAnswerCorrect(answer) ?
                setFeedback("Correct!") :
                setFeedback(`Sorry, meaning is: ${translations.join(', ')}`)
            answerInput.current.value = ""
        }
        setRandomWord(getRandomWord(wordList, selectedCategory, selectedType))
    }

    const renderCategories = () => getCategories(wordList, selectedType)
        .map(category => (
            <option value={category} key={category}>{category}</option>
        ))

    const onCategorySelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value
        setSelectedCategory(newCategory)
    }

    const renderTypes = () => getTypes(wordList, selectedCategory)
        .map(type => (
            <option value={type} key={type}>{type}</option>
        ))

    const onTypeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value
        setSelectedType(newType)
    }

    return (
        <div className="App" >
            <form onSubmit={onFormSubmit} >
                <select onChange={onCategorySelected}>
                    {renderCategories()}
                </select>
                <select onChange={onTypeSelected}>
                    {renderTypes()}
                </select>
                <h1>{getRandomPlural(randomWord)}</h1>
                <input type="text" ref={answerInput}/>
                <h2>{feedback}</h2>
            </form>
        </div>
    );
}

export default Vocabulary;
