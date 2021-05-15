
import {getRandomWord, getRandomPlural} from "./vocabulary/allWords";
import {useRef, useState} from "react";

const Version2 = () => {
    const [feedback, setFeedback] = useState("Type your answer")
    const [randomWord, setRandomWord] = useState(getRandomWord())
    const translations = randomWord.translations

    const answerInput = useRef(null)

    const isAnswerCorrect = (answer) => {
        if(answer === "") return false
        return translations.some( (translation => {
            return translation.toLowerCase() === answer.toLowerCase()
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        const answer = answerInput.current.value.trim()
        isAnswerCorrect(answer) ?
            setFeedback("Correct!") :
            setFeedback(`Sorry, meaning is: ${translations.join(', ')}`)
        answerInput.current.value = ""
        setRandomWord(getRandomWord())
    }

    return (
        <div className="App" >
            <form onSubmit={onFormSubmit} >
                <h1>{getRandomPlural(randomWord)}</h1>
                <input type="text" ref={answerInput}/>
                <h2>{feedback}</h2>
            </form>
        </div>
    );
}

export default Version2;
