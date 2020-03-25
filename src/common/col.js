import classnames from 'classnames'
import * as React from 'react'

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs']

export const Col = (props) => {
  const sizes = []
  const { className } = props

  DEVICE_SIZES.forEach(size => {
    if (props[size]) { sizes.push(`col-${size}-${props[size]}`) }
  })

  return (
    <div
      className={classnames(className, ...sizes)}
    >
      {props.children}
    </div>
  )
}
