import React, { Component } from 'react';
import './App.css';
import Header from './components/common/header/Header';
import Routes from './components/common/Routes';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <main className="container">
                    <Routes />
                </main>
            </div>
        );
    }
}

export default App;
