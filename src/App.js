import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ComplexTimer from './components/ComplexTimer';

const APP_TITLE = 'Hangtimer';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid px-3">
          <a href="/" className="navbar-brand my-2 h1">{ APP_TITLE }</a>
        </div>
      </nav>

      <main className="container mt-5 px-5">
        <ComplexTimer />
      </main>
    </div>
  );
}

export default App;
