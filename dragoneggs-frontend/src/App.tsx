import './App.css';
import { Button } from '@mui/material';
import { mint } from './scripts/utils';


function App() {
  return (
    <div className="App">
      <Button variant="contained" onClick={mint}>Say Hello</Button>
    </div>
  );
}

export default App;
