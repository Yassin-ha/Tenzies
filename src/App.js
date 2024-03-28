import './App.css';
import React from 'react';
import Dice from './Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [diceNum, setDiceNum] = React.useState(allNewDice())
  const [isWin, setIsWin] = React.useState(false)

  React.useEffect(() => {
    setIsWin(prevState => {
      if (diceNum.every(die => die.isHeld === true)) {
        return prevState = true
      } else {
        return prevState;
      }
    })
  }, [diceNum])

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        key: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return newDice;
  }
  function rollDice() {
    if (isWin) {
      setIsWin(false)
      setDiceNum(allNewDice())
    } else {
      setDiceNum(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) };
        })
      })
    }

  }

  function toggle(id) {
    setDiceNum(prevDice => {
      return prevDice.map(item => {
        return item.key === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    })
  }
  const dice = diceNum.map(die => <Dice
    isHeld={die.isHeld}
    style={{ backgroundColor: die.isHeld ? "rgba(89, 227, 145, 1)" : "#fff" }}
    value={die.value}
    key={die.key}
    id={die.key}
    toggle={toggle}
  />)

  const width = window.innerWidth - 5;
  const height = window.innerHeight - 5;
  return (
    <div className="App">
      {isWin && <Confetti width={width} height={height} />}
      <div className='container'>
        <div className='Text'>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className='num'>
          {dice}
        </div>
        <button onClick={rollDice} className='roll'>{isWin ? "New Game" : "Roll"}</button>

      </div>
    </div>
  );
}

export default App;
