import './App.css';
import words from './words.json'
import {useRef, useState} from "react";

const randomProperty = (obj) => {
    const keys = Object.keys(obj)
    const randomIndex = keys.length * Math.random() << 0
    return keys[randomIndex]
};

function App() {
    const [word, setWord] = useState(randomProperty(words))
    const [feedback, setFeedback] = useState("Type your answer")

    const answerInput = useRef(null)

    const translations = words[word]

    const isAnswerCorrect = (answer) => {
        return translations.some( (translation => {
            return translation.toLowerCase().includes(answer.toLowerCase())
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        const answer = answerInput.current.value
        isAnswerCorrect(answer) ?
            setFeedback("Correct!") :
            setFeedback(`Sorry, meaning is: ${translations.join(', ')}`)
        answerInput.current.value = ""
        setWord(randomProperty(words))
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
