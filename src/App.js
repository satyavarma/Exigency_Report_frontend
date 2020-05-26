import React, {Component} from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { CreateStore, createStore } from 'redux';
import { combineForms } from 'react-redux-form';
import './App.css';

const initialLogin = {username:'', password:''};
const initialSignup = {username:'', password:''};
const initialSearch = {adharno:''};
const initialAdd = {
  name: "",
  adharno:"",
  mobileno:"",
  emgcntno: "",
  born:"",
  gender:"",
  height:"",
  weight:"",
  physicallychallenged: "",
  bloodgroup: "",
  skindiseases: "",
  bp:"",
  sugar: "",
  asthma:"",
  heartproblems: "",
  surgeries: "",
  hereditaryproblems: "",
  cancers: "",
  aids:"",
  senseorgansproblems:""
}
const initialUpdate = {
  adharno:"",
  mobileno:"",
  emgcntno: "",
  height:"",
  weight:"",
  physicallychallenged: "",
  skindiseases: "",
  bp:"",
  sugar: "",
  asthma:"",
  heartproblems: "",
  surgeries: "",
  hereditaryproblems: "",
  cancers: "",
  aids:"",
  senseorgansproblems:""
}

const store = createStore(combineForms(
  {
    login : initialLogin,
    signup: initialSignup,
    search: initialSearch,
    add: initialAdd,
    update: initialUpdate
  }
));

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
