import * as React from 'react'

// declare module 'react-editable-tag' {

  export interface ReactContenteditableProps {
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

  export class ReactContenteditable extends React.Component<ReactContenteditableProps> { }

  export default ReactContenteditable
// }