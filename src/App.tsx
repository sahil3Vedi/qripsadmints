//REACT
import React, { Component } from 'react'
//COMPS
import SignIn from './pages/signin'
import Admin from './pages/admin'
//ACTIONS
import * as actions from './actions/auth'
//CSS
import './App.css'
import 'antd/dist/antd.css'
import './styles/css/antd.css'

interface AppState {
    loggedIn: boolean
}
interface AppProp {}

class App extends Component<AppProp,AppState>{

    constructor(props: AppProp){
        super(props)
        this.state={
            loggedIn: false
        }
    }

    componentDidMount(){
        actions.authCheckState(this.setLogin)
    }

    setLogin = (value: boolean):void => {
        this.setState({loggedIn: value})
    }

    render(){
        let signin = <SignIn setLogin={this.setLogin}/>
        let admin = <Admin setLogin={this.setLogin}/>
        return (
          <div>{this.state.loggedIn ? admin : signin}</div>
        )
    }

}

export default App
