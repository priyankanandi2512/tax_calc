import React, { useEffect } from 'react'
// import './Home.css'
import { useSelector, useDispatch } from 'react-redux'
import cognitoUtils from '../lib/cognitoUtils'
import { SET_SESSION, FETCH_TRANSACTIONS } from '../constants/actionTypes'
import TaxApp from '../Components/TaxApp'

function Home () {
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  if (ENV !== 'production') {
    useEffect(() => {
      if (session.isLoggedIn) dispatch({ type: FETCH_TRANSACTIONS, payload: { userName: session.userName } })
      if (!session.userName) {
        cognitoUtils.getCognitoSession()
          .then((res) => {
            console.log('resssss', res)
            return dispatch({ type: SET_SESSION, session: res.user })
          }
          )
          .catch(() => window.location.replace(cognitoUtils.getCognitoSignInUri()))
      }
    }, [session.isLoggedIn])
  }
  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  return (
    <div className="Home">

      <header className="Home-header">
        { (session.isLoggedIn || ENV === 'production') ? (
          <>
            <TaxApp userName={session.userName} onSignOut={onSignOut} />
          </>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <a className="Home-link" href={cognitoUtils.getCognitoSignInUri()}>Sign in</a>
          </div>
        )}

      </header>
    </div>
  )
}

export default Home
