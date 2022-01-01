import React, { FC, FormEvent, useRef, useState } from "react";
import { Word } from "./vocabulary/wordParser";
import {
    getRandomWord,
    getWordsByType,
    wordTypes
} from "./vocabulary/wordHelper";

type GenderPracticeProps = {
    wordList: Word[]
}

const GenderPractice: FC<GenderPracticeProps> = ({wordList}) => {
    const nouns = getWordsByType(wordList, wordTypes.NOUN)
    const [randomNoun, setRandomNoun] = useState(getRandomWord(nouns))
    const [feedback, setFeedback] = useState("Type your answer")

    const answerInput = useRef<HTMLInputElement>(null)

    const isAnswerCorrect = (answer: string) => {
        if(answer === "") return false
        return randomNoun.pronoun === answer.toLowerCase().trim()
    }

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (answerInput && answerInput.current) {
            const answer = answerInput.current.value.trim() || ""
            isAnswerCorrect(answer) ?
                setFeedback("Correct!") :
                setFeedback(`Sorry, right pronoun is: ${randomNoun.pronoun}`)
            answerInput.current.value = ""
        }
        setRandomNoun(getRandomWord(nouns))
    }

    return (
        <div>
            <form onSubmit={onFormSubmit} >
                <h1>{randomNoun.singular}</h1>
                <input type="text" ref={answerInput}/>
                <h2>{feedback}</h2>
            </form>
        </div>
    )
}

export default GenderPractice
