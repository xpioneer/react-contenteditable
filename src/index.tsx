import React, { useEffect, createRef, useRef, forwardRef } from 'react'
import './style.less'


interface IProps {
  /**
   * default: true
   */
  editable?: boolean

  /**
   * placeholder
   */
  placeholder?: string

  /**
   * style
   */
  style?: React.CSSProperties

  /**
   * default: 'editable-area'
   */
  className?: string

  /**
   * delimiter, default: #
   */
  delimiter?: string

  /**
   * value
   */
  value?: string

  /**
   * default: ''
   */
  keyWords?: string[] | string

  /**
   * onChange
   */
  onChange?: (value?: string) => void

  /**
   * onKeyWord
   */
  onKeyWord?: () => void
}


export const ContentEditable: React.FC<IProps> = forwardRef((props, ref) => {

  const {
    placeholder,
    style,
    className = '',
    editable = true,
    delimiter = '#',
    value,
    keyWords = '',
    onChange,
    onKeyWord
  } = props

  const editableRef = createRef<HTMLDivElement>()
  const beforeInsertOffsetRef = useRef(0)
  const curNodeRef = useRef<Node>()
  const enteredRef = useRef(false)
  const codeRef = useRef<string>()

  const onInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = document.getSelection()!;
    const currentNode = selection.anchorNode!

    const $ref = editableRef.current!
    const children = $ref.childNodes

    enteredRef.current = true

    if(currentNode.nodeType === 3) { // text node
      const nodeVal = currentNode.nodeValue!
      const offset = selection.anchorOffset

      // save current node & position
      curNodeRef.current = currentNode
      beforeInsertOffsetRef.current = offset

      const txt = nodeVal.substring(0, offset)

      onChange && onChange($ref.innerHTML)

      if(txt.endsWith(delimiter) && codeRef.current !== 'Backspace') {
        // fire onKeyWord
        onKeyWord && onKeyWord()
      }
    } else if ($ref === currentNode && children.length === 0) {
      onChange && onChange(undefined)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { code } = e
    if(code === 'Enter') {
      e.preventDefault()
      return
    }

    codeRef.current = code

    const $ref = editableRef.current!,
      nodes = $ref.childNodes,
      len = nodes.length

    const selection = document.getSelection()!,
      offset = selection.anchorOffset,
      currentNode = nodes[offset]

    if(offset < len && code === 'ArrowRight') {
      e.preventDefault()
      const range = selection.getRangeAt(0)
      range.setStartAfter(currentNode)
    }
  }

  useEffect(() => {
    if(keyWords && keyWords.length > 0) {
      let vals: string[] = []
      if(typeof keyWords === 'string') {
        vals = [keyWords]
      } else {
        vals = keyWords
      }

      const $ref = editableRef.current!
      const currentNode = curNodeRef.current!
      const nodeVal = currentNode.nodeValue!
      const offset = beforeInsertOffsetRef.current

      const arr: Node[] = [],
        beforeStr = nodeVal.slice(0, offset - 1),
        afterStr = nodeVal.slice(offset, nodeVal.length)
      let hasTail = false
      if(beforeStr !== '') {
        arr.push(document.createTextNode(beforeStr))
      }

      const nodes = vals.map(v => {
        const node = document.createElement('span')
        node.contentEditable = 'false'
        node.innerText = `#${v}#`
        return node
      })
      
      arr.splice.apply(arr, [1, 0, ...nodes])

      if(afterStr !== '') {
        hasTail = true
        arr.push(document.createTextNode(afterStr))
      }

      const fragment = document.createDocumentFragment()
      arr.forEach(n => {
        fragment.appendChild(n)
      });
      
      $ref.insertBefore(fragment, currentNode)
      $ref.removeChild(currentNode)
      
      const range = document.getSelection()!.getRangeAt(0)
      if(hasTail) {
        range.setStartBefore(arr[arr.length - 1])
      } else {
        range.setStartAfter(arr[arr.length - 1])
      }

      onChange && onChange($ref.innerHTML)
    }
  }, [keyWords])

  useEffect(() => {
    // Trigger only under non-input conditions(use innerHTML)
    if(enteredRef.current === false) {
      editableRef.current!.innerHTML = value === undefined ? '' : value
    }
  }, [value])

  const $className = `${className} editable-area`

  return <div
    placeholder={placeholder}
    style={style}
    contentEditable={editable}
    className={$className}
    ref={editableRef}
    onInput={onInput}
    onKeyDown={onKeyDown}
    onPaste={e => e.preventDefault()}></div>
})
