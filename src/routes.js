import { Switch, Route, Redirect } from 'react-router-dom'
import { ChatPage } from './pages/ChatPage'
import { AuthPage } from './pages/AuthPage'
import { ProfilePage } from './pages/ProfilePage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const useRoutes = isAuth => {

  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/">
          <ChatPage />
        </Route>
        <Route exact path="/auth">
          <AuthPage />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/404">
          <NotFoundPage />
        </Route>
        <Redirect to="/404" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route exact path="/">
        <ChatPage />
      </Route>
      <Route exact path="/auth">
        <AuthPage />
      </Route>
      <Route exact path="/profile">
        <Redirect to="/auth" />
      </Route>
      <Route exact path="/about">
        <AboutPage />
      </Route>
      <Route exact path="/404">
        <NotFoundPage />
      </Route>
      <Redirect to="/404" />
    </Switch>
  )
}