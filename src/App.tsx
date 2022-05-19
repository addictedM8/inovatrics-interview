import './App.css';
import { createClient, Provider } from 'urql';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Table from './Table';


const client = createClient({
  url: 'https://api.spacex.land/graphql',
});

const App = () => {
  return (
    <div className='App'>
      <Provider value={client}>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
