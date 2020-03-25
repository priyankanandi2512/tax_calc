// import classnames from 'classnames'
import * as React from 'react'

const BASE_ROW_CLASS = 'row'

export const Row = (props) => {
//   const { className, formRow } = props

  return (
    <div className={BASE_ROW_CLASS}>
      {props.children}
    </div>
  )
}
