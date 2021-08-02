### React-ContentEditable

A simple editable plugin with react, can fire keywords(props key: `delimiter`, default: `#`)


#### Installation
```
yarn add react-editable-tag

#or

npm i react-editable-tag
```

#### Usage
```js
import React, { useState } from 'react'
import { ContentEditable } from '../src/index'

function App() {
  const [keyWords, setKeyWords] = useState<string>()

  const onKeyWord = () => {
    const val = prompt('Please input')
    if(val !== null) {
      setKeyWords(val)
    }
  }


  return <div>
    <ContentEditable
      keyWords={keyWords}
      onKeyWord={onKeyWord}/>
  </div>
}
```

#### Features

* React Hooks
* TypeScript
* Antd Style