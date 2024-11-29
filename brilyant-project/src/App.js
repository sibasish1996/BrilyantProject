import logo from './logo.svg';
import './App.css';
import DynamicMenu from './DynamicMenu';
import DragAndDrop_List from './DragAndDrop_List';
import MovieSearch from './MovieSearch';

function App() {
  return (
    <div className="App">
      <div>
      <DynamicMenu/>
      </div>

      <div style={{padding:"20px"}}>
      <DragAndDrop_List/>
      </div>

      <div style={{padding:"20px"}}>
      <MovieSearch/>
      </div>
     
      
     
    </div>
  );
}

export default App;
