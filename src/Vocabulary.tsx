import React, { ChangeEvent, FormEvent } from "react";
import {
    getRandomWord,
    getRandomPlural,
    getCategories,
    getTypes,
    ALL_CATEGORIES,
    ALL_TYPES
} from "./vocabulary/allWords";
import {useEffect, useRef, useState} from "react";

const Vocabulary = () => {
    const [feedback, setFeedback] = useState("Type your answer")
    const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
    const [selectedType, setSelectedType] = useState(ALL_TYPES)
    const [randomWord, setRandomWord] = useState(getRandomWord(selectedCategory, selectedType))
    const translations = randomWord && randomWord.translations

    useEffect(()=>{
        setRandomWord(getRandomWord(selectedCategory, selectedType))
    },[selectedCategory, selectedType])

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
        setRandomWord(getRandomWord(selectedCategory, selectedType))
    }

    const renderCategories = () => getCategories()
        .map(category => (
            <option value={category} key={category}>{category}</option>
        ))

    const onCategorySelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value
        setSelectedCategory(newCategory)
    }

    const renderTypes = () => getTypes()
        .map(type => (
            <option value={type} key={type}>{type}</option>
        ))

    const onTypeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value
        setSelectedType(newCategory)
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
                {randomWord ? (
                    <div>
                        <h1>{getRandomPlural(randomWord)}</h1>
                        <input type="text" ref={answerInput}/>
                        <h2>{feedback}</h2>
                    </div>
                ) : <div>No words matching selected filters</div>}
            </form>
        </div>
    );
}

export default Vocabulary;
