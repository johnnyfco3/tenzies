import './App.css';
import Die from './components/Die';
import {React, useEffect, useState} from "react"
import { nanoid } from "nanoid"

export function App() {

  const [array, setArray] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{
    const allHeld = array.every(element => element.isHeld)

    // function allHeld(){
    //   let held = true
    //   for(let i = 0; i<array.length; i++){
    //     if(array[i].isHeld === false){
    //       held = false
    //       return held
    //     }
    //   }
    //   return held
    // }

    const firstVal = array[0].value
    const allValue = array.every(element => element.value === firstVal)
    
    // function allValue(){
    //   let val = array[0].value
    //   let bool = true
    //   for(let i = 0; i<array.length; i++){
    //     if(array[i].value !== val){
    //       bool = false
    //       return bool
    //     }
    //   }
    //   return bool
    // }

    if(allHeld && allValue){
      setTenzies(true)
    } 
  }, [array])

  function generateNewDie(){
    return{
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    }
  }
  
  function allNewDice(){
    const newArray = []
    for(let i = 0; i<10; i++){
      newArray.push(generateNewDie())
    }
    return newArray;
  }

  function rollDice(){
    if(!tenzies){
      setArray(preState => preState.map(element =>{
          return element.isHeld ? 
            element :
            generateNewDie()
      }))
    }else{
      setTenzies(false)
      setArray(allNewDice())
    }
  }

  function holdDice(dieID){
    setArray(preState => preState.map(element =>{
        return element.id === dieID ? {...element, isHeld: !element.isHeld} : element
      }))
  }

  const values = array.map((element) => {
      return <Die 
      key={element.id} 
      value={element.value} 
      isHeld={element.isHeld} 
      handleClick={()=>holdDice(element.id)}/>
    })

  return (
    <div className="App">
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls</p>
        <div className='container'>
          {values}
        </div>
        <button onClick={rollDice}>{tenzies ? "Reset Game" : "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
