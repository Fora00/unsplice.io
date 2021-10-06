import {render, screen} from '@testing-library/react'
import Login from './../pages/Login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import userEvent from '@testing-library/user-event'
import {StaticRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './../redux/store';
import { userCredentials } from './mocks';
// import { act } from '@react-dom/test-utils';
import { ReactDOM } from 'react';
import AuthRoute from './../utils/AuthRoute'
import spyed from '../utils/spyfunction';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

describe('Login Component', () => {
  test('should match the snapshot', () => {
    const {container} = render(
    <StaticRouter>
      <ApolloProvider client={client}>
        <Provider  store={store}>
          <Login />
        </Provider>
      </ApolloProvider>
    </StaticRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  })

  test("should have inputs for email and password", () => {
    render(    <StaticRouter>
      <ApolloProvider client={client}>
        <Provider  store={store}>
          <Login />
        </Provider>
      </ApolloProvider>
    </StaticRouter>)
  screen.getByLabelText(/Password/)
  screen.getByLabelText(/Email Address/)
  } )

  test("should have sign in button", () => {
   render(    <StaticRouter>
      <ApolloProvider client={client}>
        <Provider  store={store}>
          <Login />
        </Provider>
      </ApolloProvider>
    </StaticRouter>)
  screen.getByRole("button",{name: "Sign In"})
  } )
});


describe('Login Integration Test', () => {
  test("should insert correctly the credentials and submit the login form", () => {
   const spy = jest.spyOn(spyed, 'play')

    render(    <StaticRouter>
      <ApolloProvider client={client}>
        <Provider  store={store}>
          <Login />
        </Provider>
      </ApolloProvider>
    </StaticRouter>)

  const passwordInput = screen.getByLabelText(/Password/)
  const emailInput = screen.getByLabelText(/Email Address/)
  const submitBtn = screen.getByRole("button",{name: "Sign In"})
  userEvent.type(emailInput, userCredentials.email)
  userEvent.type(passwordInput, userCredentials.password)
  userEvent.click(submitBtn)
  expect(spy).toHaveBeenCalled();
  //console.log("🔮", store.getState())
})
})