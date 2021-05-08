import './App.css';
import words from './words.json'
import {useRef, useState} from "react";

const getRandomNumber = (max, previous) => {
    const random = Math.floor(Math.random() * max)
    return random === previous ? getRandomNumber(max, previous) : random
}
const randomProperty = (obj, previousRandom) => {
    const keys = Object.keys(obj)
    return keys[getRandomNumber(keys.length, previousRandom)]
};

function App() {
    const numberOfWords = Object.keys(words).length
    const [feedback, setFeedback] = useState("Type your answer")
    const [previousRandomIndex, setPreviousRandomIndex] = useState(0)
    const [word, setWord] = useState(randomProperty(words, previousRandomIndex))

    const answerInput = useRef(null)

    const translations = words[word]

    const isAnswerCorrect = (answer) => {
        return translations.some( (translation => {
            return translation.toLowerCase().includes(answer.toLowerCase())
        }))
    }

    const setNewRandomWord = () => {
        const randomIndex = getRandomNumber(numberOfWords, previousRandomIndex)
        setPreviousRandomIndex(randomIndex)
        setWord(randomProperty(words, previousRandomIndex))
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        const answer = answerInput.current.value
        isAnswerCorrect(answer) ?
            setFeedback("Correct!") :
            setFeedback(`Sorry, meaning is: ${translations.join(', ')}`)
        answerInput.current.value = ""
        setNewRandomWord()
    }

    return (
        <div className="App">
            <form onSubmit={onFormSubmit} >
                <h1>{word}</h1>
                <input type="text" ref={answerInput}/>
                <h2>{feedback}</h2>
            </form>
        </div>
    );
}

export default App;
