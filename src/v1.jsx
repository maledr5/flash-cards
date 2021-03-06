import {useRef, useState} from "react";
import wordsByType from './vocabulary/words_practice.json'
// import wordsByType from './vocabulary/words_v1.json'

const getRandomNumber = (max, previous) => {
    const random = Math.floor(Math.random() * max)
    return random === previous ? getRandomNumber(max, previous) : random
}
const randomProperty = (obj, previousRandom) => {
    const keys = Object.keys(obj)
    return keys[getRandomNumber(keys.length, previousRandom)]
}

const getArrayOfWords = (wordsObject) => {
    const arrayOfWordsByType = Object.values(wordsObject)
    const concatenateObjects = (a,b) => {
        return {...a, ...b}
    }
    return arrayOfWordsByType.reduce(concatenateObjects)
}

const Version1 = () => {
    const words = getArrayOfWords(wordsByType)
    const numberOfWords = words.length

    const [feedback, setFeedback] = useState("Type your answer")
    const [previousRandomIndex, setPreviousRandomIndex] = useState(0)
    const [word, setWord] = useState(randomProperty(words, previousRandomIndex))

    const answerInput = useRef(null)

    const translations = words[word]

    const isAnswerCorrect = (answer) => {
        if(answer === "") return false
        return translations.some( (translation => {
            return translation.toLowerCase() === answer.toLowerCase()
        }))
    }

    const showNewRandomWord = () => {
        const randomIndex = getRandomNumber(numberOfWords, previousRandomIndex)
        setPreviousRandomIndex(randomIndex)
        setWord(randomProperty(words, previousRandomIndex))
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        const answer = answerInput.current.value.trim()
        isAnswerCorrect(answer) ?
            setFeedback("Correct!") :
            setFeedback(`Sorry, meaning is: ${translations.join(', ')}`)
        answerInput.current.value = ""
        showNewRandomWord()
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

export default Version1;
