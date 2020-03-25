import React from 'react'

export default function Header ({ title }) {
  return (
    <div className="header">
      <p className="header__title">{title}</p>
    </div>
  )
}
