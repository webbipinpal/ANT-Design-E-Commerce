import logo from './logo.svg';
import './App.css';
import AppFooter from './Components/Footer';
import AppHeader from './Components/Header';
import PageContent from './Components/PageContent';

function App() {
  return (
    <div className='wrapper'>
    <AppHeader />
    <PageContent />
    <AppFooter />
    </div>
  );
}

export default App;
