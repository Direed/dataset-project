import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://eagleeye-data-api-mwqsk7jcqa-ey.a.run.app/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
