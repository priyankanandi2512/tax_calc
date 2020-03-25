import classnames from 'classnames'
import * as React from 'react'

const DEFAULT_CARD_CLASS = 'default-card'

export const Card = (props) => {
  const { className, lg, md, sm, xl, wide, collapsed } = props

  return (
    <div
      className={classnames(DEFAULT_CARD_CLASS, className,
        {
          [`${DEFAULT_CARD_CLASS}-lg`]: lg,
          [`${DEFAULT_CARD_CLASS}-md`]: md,
          [`${DEFAULT_CARD_CLASS}-sm`]: sm,
          [`${DEFAULT_CARD_CLASS}-xl`]: xl,
          [`${DEFAULT_CARD_CLASS}-wide`]: wide,
          [`${DEFAULT_CARD_CLASS}-collapsed`]: collapsed
        })}
    >
      {props.children}
    </div>
  )
}
