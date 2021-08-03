import * as React from 'react'

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

export interface ContenteditableComponent extends React.Component<ReactContenteditableProps> { }

declare const ReactContenteditable: ContenteditableComponent

export default ReactContenteditable
