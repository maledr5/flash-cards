import React, { ChangeEvent, FormEvent } from "react";
import {getRandomWord, getRandomPlural, getCategories} from "./vocabulary/allWords";
import {useEffect, useRef, useState} from "react";

const Vocabulary = () => {
    const [feedback, setFeedback] = useState("Type your answer")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [randomWord, setRandomWord] = useState(getRandomWord(selectedCategory))
    const translations = randomWord.translations

    useEffect(()=>{
        setRandomWord(getRandomWord(selectedCategory))
    },[selectedCategory])

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
        setRandomWord(getRandomWord(selectedCategory))
    }

    const renderCategories = () => getCategories()
        .map(category => (
            <option value={category} key={category}>{category}</option>
        ))

    const onCategorySelected = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value
        setSelectedCategory(newCategory)
    }

    return (
        <div className="App" >
            <form onSubmit={onFormSubmit} >
                <select onChange={onCategorySelected}>
                    {renderCategories()}
                </select>
                <h1>{getRandomPlural(randomWord)} ({randomWord.category})</h1>
                <input type="text" ref={answerInput}/>
                <h2>{feedback}</h2>
            </form>
        </div>
    );
}

export default Vocabulary;
