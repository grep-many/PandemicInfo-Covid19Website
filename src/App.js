import './App.css';
import React from 'react';
import Header from './components/header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './page/Home';
import About from './page/about/About';
import Contact from './page/contact/Contact';
import Footer from './components/footer/Footer';

const App = () => {

  return (
    <>
      <Router basename="/pandemic-info/">
        <Header />
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/about"><About/></Route>
          <Route exact path="/contact"><Contact/></Route>
          <Route path="*"><Home/></Route>
        </Switch>
        <Footer/>
      </Router>
    </>
  )
}

export default App;