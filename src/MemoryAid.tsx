import React, { FormEvent, useState } from "react";
import VocabularyPractice from "./VocabularyPractice";
import { germanWords, translatedWords } from "./vocabulary/wordParser";
import GenderPractice from "./GenderPractice";

const FILL_IN_TRANSLATIONS = 'fillInTranslations'
const FILL_IN_GERMAN = 'fillInGerman'
const FILL_IN_GENDER = 'fillInGender'

const MemoryAid = () => {
    const [wordList, setWordList] = useState(germanWords)
    const [typeOfExercise, setTypeOfExercise] = useState(FILL_IN_TRANSLATIONS)

    const onOptionSelected = (event: any) => {
        const selectedTypeOfExercise = event.target.value || FILL_IN_TRANSLATIONS
        const newWordList = (selectedTypeOfExercise === FILL_IN_TRANSLATIONS
            || selectedTypeOfExercise === FILL_IN_GENDER)
            ? germanWords
            : translatedWords
        setWordList(newWordList)
        setTypeOfExercise(selectedTypeOfExercise)
    }

    return (
        <>
            <h1>Vocabulary Practice</h1>
            <div onChange={onOptionSelected}>
                <input type="radio" id={FILL_IN_TRANSLATIONS}
                       name="exerciseType" value={FILL_IN_TRANSLATIONS} defaultChecked={true} onChange={onOptionSelected}/>
                <label htmlFor={FILL_IN_TRANSLATIONS}>Fill in translations</label>

                <input type="radio" id={FILL_IN_GERMAN}
                       name="exerciseType" value={FILL_IN_GERMAN} onChange={onOptionSelected}/>
                <label htmlFor={FILL_IN_GERMAN}>Fill in German</label>

                <input type="radio" id={FILL_IN_GENDER}
                       name="exerciseType" value={FILL_IN_GENDER} onChange={onOptionSelected}/>
                <label htmlFor={FILL_IN_GENDER}>Fill in German</label>
            </div>
            <br/><br/>
            {
                typeOfExercise === FILL_IN_GENDER
                ? <GenderPractice wordList={wordList} />
                : <VocabularyPractice wordList={wordList} />
            }
        </>
    )
}

export default MemoryAid
