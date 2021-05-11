import React, { useState } from 'react'
import { ContentEditable } from '../lib/index'

export const App: React.FC = props => {

  const [keyWords, setKeyWords] = useState<string>()

  const onKeyWord = () => {
    const val = prompt('Please input')
    if(val !== null) {
      setKeyWords(val)
    }
  }

  
  return <div>
    <ContentEditable keyWords={keyWords} onKeyWord={onKeyWord}/>
  </div>
}