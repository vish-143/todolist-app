import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import { Addpage } from './addpage';
import { Homepage } from './homepage';
import { store } from './service/store';
import { Completedpage } from './completedpage';
import { Editpage } from './editpage';

function App() {
  return (
    <>
   <Provider store={store}>
     <Router>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route path="/addpage" component={Addpage}/>
        <Route path="/completedpage" component={Completedpage}/>
        <Route path="/editpage/:id" component={Editpage}/>
      </Switch>
     </Router>
   </Provider>
    </>
  );
}

export default App;
