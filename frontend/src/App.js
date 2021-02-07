import logo from './logo.svg';
import './App.css';
import Layout from './taskTimer/layout'
import {Switch,Route,Router} from 'react-router-dom'
import Register from './taskTimer/register'
import Login from './taskTimer/login';
import Main from './taskTimer/main';
import history from './history'

function App(props) {
  return (
    <div className="">
         {/* <Router history ={history}> */}
      <Layout {...props}>
       <Switch>
         <Route path="/" exact component={Register}/>
         <Route path="/login" exact component={Login}/>
         <Route path="/main" exact component ={Main}/>
       </Switch>
      </Layout>
         {/* </Router>/ */}
    </div>
  );
}

export default App;
