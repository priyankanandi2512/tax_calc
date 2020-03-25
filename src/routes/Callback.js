import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initSessionFromCallbackURI } from '../actions/session'

export default function Callback (props) {
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSessionFromCallbackURI(window.location.href))
  }, [props.location.hash, props.location.search])

  if ((!props.location.hash && !props.location.search) || session.isLoggedIn) {
    return <Redirect to="/" />
  }

  return <div />
}
