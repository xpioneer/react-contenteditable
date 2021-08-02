import * as React from 'react'

declare module 'contenteitable' {
  interface ReactContenteditableProps {
    editable?: boolean
    placeholder?: string
    style?: React.CSSProperties
    className?: string
    delimiter?: string
    value?: string
    keyWords?: string[] | string
    onChange?: (value?: string) => void
    onKeyWord?: () => void
  }

  class ReactContenteditable extends React.Component<ReactContenteditableProps> { }
}