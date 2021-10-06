import {render, screen} from '@testing-library/react'
import Login from './../pages/Login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import {StaticRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './../redux/store';

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
})
