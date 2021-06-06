"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var allWords_1 = require("./vocabulary/allWords");
var react_2 = require("react");
var Vocabulary = function () {
    var _a = react_2.useState("Type your answer"), feedback = _a[0], setFeedback = _a[1];
    var _b = react_2.useState("all"), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = react_2.useState(allWords_1.getRandomWord(selectedCategory)), randomWord = _c[0], setRandomWord = _c[1];
    var translations = randomWord.translations;
    react_2.useEffect(function () {
        setRandomWord(allWords_1.getRandomWord(selectedCategory));
    }, [selectedCategory]);
    var answerInput = react_2.useRef(null);
    var isAnswerCorrect = function (answer) {
        if (answer === "")
            return false;
        return translations.some((function (translation) {
            return translation.toLowerCase().trim() === answer.toLowerCase().trim();
        }));
    };
    var onFormSubmit = function (event) {
        event.preventDefault();
        if (answerInput && answerInput.current) {
            var answer = answerInput.current.value.trim() || "";
            isAnswerCorrect(answer) ?
                setFeedback("Correct!") :
                setFeedback("Sorry, meaning is: " + translations.join(', '));
            answerInput.current.value = "";
        }
        setRandomWord(allWords_1.getRandomWord(selectedCategory));
    };
    var renderCategories = function () { return allWords_1.getCategories()
        .map(function (category) { return (react_1.default.createElement("option", { value: category, key: category }, category)); }); };
    var onCategorySelected = function (e) {
        var newCategory = e.target.value;
        setSelectedCategory(newCategory);
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("form", { onSubmit: onFormSubmit },
            react_1.default.createElement("select", { onChange: onCategorySelected }, renderCategories()),
            react_1.default.createElement("h1", null,
                allWords_1.getRandomPlural(randomWord),
                " (",
                randomWord.category,
                ")"),
            react_1.default.createElement("input", { type: "text", ref: answerInput }),
            react_1.default.createElement("h2", null, feedback))));
};
exports.default = Vocabulary;
