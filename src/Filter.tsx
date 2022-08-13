import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import {
  ALL_CATEGORIES,
  ALL_TYPES,
  getCategories,
  getFilteredRandomWord,
  getRandomPlural,
  getTypes
} from "./vocabulary/wordHelper";
import { Word } from "./vocabulary/wordParser";

type FilterProps = {
  wordList: Word[],
  setSelectedCategory: (category: string) => {},
  setSelectedType: (type: string) => {},
}

const Filter: FC<FilterProps> = ({wordList}) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [selectedType, setSelectedType] = useState(ALL_TYPES)
  // const [randomWord, setRandomWord] = useState(getFilteredRandomWord(wordList, selectedCategory, selectedType))
  // const translations = randomWord.translations
  //
  // useEffect(()=>{
  //   setRandomWord(getFilteredRandomWord(wordList, selectedCategory, selectedType))
  // },[selectedCategory, selectedType, wordList])
  //
  // const answerInput = useRef<HTMLInputElement>(null)
  //
  // const isAnswerCorrect = (answer: string) => {
  //   if(answer === "") return false
  //   return translations.some( (translation => {
  //     return translation.toLowerCase().trim() === answer.toLowerCase().trim()
  //   }))
  // }
  //
  // const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   if (answerInput && answerInput.current) {
  //     const answer = answerInput.current.value.trim() || ""
  //
  //     if (isAnswerCorrect(answer)) {
  //       setFeedback("Correct!")
  //       setRandomWord(getFilteredRandomWord(wordList, selectedCategory, selectedType))
  //     } else {
  //       setFeedback(`Sorry, meaning is: ${translations.join(', ')}`)
  //     }
  //     answerInput.current.value = ""
  //   }
  // }

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
    <div className="container" >
      <select onChange={onCategorySelected}>
        {renderCategories()}
      </select>
      <select onChange={onTypeSelected}>
        {renderTypes()}
      </select>
    </div>
  );
}

export default Filter
