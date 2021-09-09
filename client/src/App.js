import Booklist from './components/Booklist';
import AddBook from './components/Addbook';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache()
})



function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <h1>Madlad's GraphQL BookShelf</h1>
        <Booklist />
        <AddBook />
      </ApolloProvider>
    </div>
  );
}

export default App;
