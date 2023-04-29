import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar.js'
import { TokenProvider } from './components/TokenContext';

function App() {
  return (
    <div className="App">
      <TokenProvider>
        <SearchBar />
      </TokenProvider>
      {/* { more components here} */}
    </div>
  );
}

export default App;
