import React, { Component } from 'react';
import 'grommet/scss/vanilla/index.scss';
import './style/App.scss';
import {
    BrowserRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './pages/layout/Layout';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);