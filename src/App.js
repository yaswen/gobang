import React, { Component } from 'react';
import {Layout } from 'antd';
import FGame from './components/FGame';
//import logo from './logo.svg';
import './App.css';


const {Header, Footer, Content} = Layout;

class App extends Component {
    constructor(){
        super();
    }

  render() {


    return (
      <div className="App">
	      <Layout theme={"light"}>
            <Header>
                <h1 style={{color:'#bbbbbb'}}>五子棋&nbsp;Gobang</h1>
            </Header>
            <Content >
                <FGame  style={{margin:'auto auto',textAlign:'center',padding:24}}/>
            </Content>
            <Footer>
                <div >shiwen 五子棋游戏</div>
            </Footer>
          </Layout>

      </div>
    );

  }
}

export default App;
