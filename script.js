// Step 1: Import React (to use React and ReactDOM)
import React, { useState } from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";

// Step 2: Your trivia questions and video links
const sampleData = [
{
  question: {
    video: "https://www.youtube.com/watch?v=aJRu5ltxXjc", // Naruto (placeholder)
    choices: ["Naruto", "Black Clover", "Naruto Shippuden", "Class of the Elite"],
    correct_choice_index: 0,
    text: "Where is Blue Bird from?" } },


{
  question: {
    video: "https://www.youtube.com/watch?v=vxvP9zSOL7s", // Black Clover (placeholder)
    choices: ["Naruto", "Black Clover", "Naruto Shippuden", "Class of the Elite"],
    correct_choice_index: 2,
    text: "What is Hero's Come Back!!	?" } },


{
  question: {
    video: "https://www.youtube.com/watch?v=xj9aaqzKBwM", // Black Clover (placeholder)
    choices: ["Naruto", "Black Clover", "Naruto Shippuden", "Class of the Elite"],
    correct_choice_index: 1,
    text: "Where is Black Catcher from?" } },


{
  question: {
    video: "https://www.youtube.com/watch?v=hCxZx7uHO1I", // Classroom of the Elite (placeholder)
    choices: ["Re:Zero", "Black Clover", "Overlord", "Class of the Elite"],
    correct_choice_index: 3,
    text: "Where is Reweave from?" } }];




// Step 3: Component to show the question
function Question({ text }) {
  return /*#__PURE__*/React.createElement("div", { className: "question" }, text);
}

// Step 4: Component for each answer button
function AnswerChoice({ answer, onClick, isSelected, isCorrect, showResult }) {
  let className = "answer-choice";
  if (showResult) {
    if (isCorrect) className += " correct";else
    if (isSelected) className += " wrong";
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: className, onClick: onClick },
    answer));


}

// Step 5: Component to go to the next question
function NextQuestion({ onClick, number, total, disabled }) {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { onClick: onClick, disabled: disabled }, "Next Question"), /*#__PURE__*/


    React.createElement("p", null, "Question ", number + 1, " of ", total)));


}

// Step 6: Main App Component
function App() {
  // All the states we'll use to track progress
  const [questionNum, setQuestionNum] = useState(0); // Which question are we on?
  const [selectedAnswer, setSelectedAnswer] = useState(null); // What did user click?
  const [score, setScore] = useState(0); // Score tracker
  const [showResult, setShowResult] = useState(false); // Should we show right/wrong?

  const currentQuestion = sampleData[questionNum].question;

  // When user picks an answer
  function handleAnswerClick(index) {
    if (selectedAnswer !== null) return; // Don't let them click more than once

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === currentQuestion.correct_choice_index) {
      setScore(score + 1);
    }
  }

  // When user clicks "Next Question"
  function goToNextQuestion() {
    if (questionNum + 1 < sampleData.length) {
      setQuestionNum(questionNum + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }

  // Restart the game from the beginning
  function restartGame() {
    setQuestionNum(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  }

  // Check if we've reached the end of the game
  const isGameOver = questionNum >= sampleData.length - 1 && showResult;

  // The actual UI that the user sees
  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("h1", { className: "title" }, "\uD83C\uDFB5 Guess the Anime Opening \uD83C\uDFB5"),

    !isGameOver && /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/

    React.createElement("iframe", {
      className: "video",
      width: "560",
      height: "315",
      src: currentQuestion.video,
      title: "Anime Opening",
      frameBorder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true }), /*#__PURE__*/



    React.createElement(Question, { text: currentQuestion.text }), /*#__PURE__*/


    React.createElement("div", { className: "answers" },
    currentQuestion.choices.map((choice, index) => /*#__PURE__*/
    React.createElement(AnswerChoice, {
      key: index,
      answer: choice,
      onClick: () => handleAnswerClick(index),
      isSelected: selectedAnswer === index,
      isCorrect: index === currentQuestion.correct_choice_index,
      showResult: showResult }))), /*#__PURE__*/





    React.createElement(NextQuestion, {
      onClick: goToNextQuestion,
      number: questionNum,
      total: sampleData.length,
      disabled: !showResult || questionNum === sampleData.length - 1 })),





    isGameOver && /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, "Game Over!"), /*#__PURE__*/
    React.createElement("p", null, "You got ", score, " out of ", sampleData.length, " correct!"), /*#__PURE__*/
    React.createElement("button", { onClick: restartGame }, "Restart Game"))));




}

// Step 7: Tell React to render everything inside the HTML <div id="root">
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render( /*#__PURE__*/React.createElement(App, null));