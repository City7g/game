import { useEffect, useState } from 'react'
import { test, test2 } from './example'
import './App.css'

function App() {
  const [input, setInput] = useState<string>('')
  const [list, setList] = useState<string[]>([])
  const [count, setCount] = useState<string[]>([])

  // const clearInputValue = (value) => {}

  const func = (word: string): boolean => {
    let isCorrect = true
    let sum = 0

    list.forEach((item, idx) => {
      if (count[idx] === '') return
      if (word === item) return

      const splitWord = word.split('')
      const splitItem = item.split('')

      for (let i = 0; i < splitWord.length; i++) {
        if (splitWord[i] === splitItem[i]) {
          sum++
        }
      }

      if (sum !== +count[idx]) {
        isCorrect = false
      }
      sum = 0
    })

    return isCorrect
  }

  const changeCount = (e: Event, index: number) => {
    const newArr = [...count]
    newArr[index] = e.target.value
    setCount(newArr)
  }

  useEffect(() => {
    let newList = input

    newList = newList.replaceAll('NaN', ' ')

    newList = newList.replaceAll(/\{\*\*\/\d+\}/g, ' ')
    newList = newList.replaceAll('\n', ' ')
    newList = newList.replaceAll(/\s+/g, ' ')

    newList = newList.split(' ')
    newList = newList.filter((c) => {
      return c !== ''
    })
    setList(newList)
    const newArray = Array(newList.length).fill('')
    setCount(newArray)
  }, [input])

  return (
    <>
      <h1>Hello</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          onInput={(e) => setInput(e.target.value)}
          value={input}
          className="form-control"
          placeholder="Recipient's username"
        />
        <button
          onClick={() => setInput(test)}
          className="btn btn-dark"
          type="button"
        >
          Text
        </button>
        <button
          onClick={() => setInput(test2)}
          className="btn btn-dark"
          type="button"
        >
          Text 2
        </button>
      </div>

      {list.length && (
        <ol>
          {list.map((item, index) => (
            <li key={item} className="d-flex align-items-center gap-3">
              <p className={func(item) ? '' : 'line'}>{item}</p>

              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="0"
                onInput={(e) => changeCount(e, index)}
                value={count[index]}
              />
            </li>
          ))}
        </ol>
      )}
    </>
  )
}

export default App
