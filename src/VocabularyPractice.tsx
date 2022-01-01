import React, { FormEvent, useState } from "react";
import Vocabulary from "./Vocabulary";
import { germanWords, translatedWords } from "./vocabulary/wordParser";

const FILL_IN_TRANSLATIONS = 'fillInTranslations'
const FILL_IN_GERMAN = 'fillInGerman'

const VocabularyPractice = () => {
    const [wordList, setWordList] = useState(germanWords)

    const onOptionSelected = (event: any) => {
        const selectedTypeOfExercise = event.target.value || FILL_IN_TRANSLATIONS
        const newWordList = selectedTypeOfExercise === FILL_IN_TRANSLATIONS ? germanWords : translatedWords
        setWordList(newWordList)
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
            </div>
            <Vocabulary wordList={wordList}/>
        </>
    )

}

export default VocabularyPractice
