"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.getRandomPlural = exports.getRandomWord = exports.words = void 0;
// @ts-ignore
var data_csv_1 = __importDefault(require("./data.csv"));
var words = data_csv_1.default.map(function (word) { return (__assign(__assign({}, word), { translations: word.translations.split(',') })); });
exports.words = words;
var getRandomWord = function (categoryFilter) {
    var filteredWords = categoryFilter === 'all' ? words : words.filter(function (word) { return word.category === categoryFilter; });
    var randomNum = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomNum];
};
exports.getRandomWord = getRandomWord;
var getRandomPlural = function (word) {
    var isPlural = Math.floor(Math.random() * 2);
    return isPlural && word.type === 'noun' && word.plural != null ? word.plural : word.singular;
};
exports.getRandomPlural = getRandomPlural;
var getCategories = function () {
    var allCategories = words.map(function (word) { return word.category; });
    var uniqueCategories = Array.from(new Set(allCategories));
    return __spreadArray(['all'], uniqueCategories);
};
exports.getCategories = getCategories;
