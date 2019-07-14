import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import AllOpinions from './AllOpinions';
import AddOpinions from './AddOpinion';
import { MemoryRouter, Route, Switch } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
      editPerson: '',
    }
  }

  render() {
    return (
      <div style={{maxWidth : '800px', margin: 'auto'}}>
        <Segment>
          <Header as='h1'>Retro App</Header>
        </Segment>
        <Segment>
          <MemoryRouter>
          <Switch>
            <Route exact={true} path="/" component={AddOpinions}></Route>
            <Route path="/summary" component={AllOpinions}></Route>
          </Switch>
          </MemoryRouter>
        </Segment>
      </div>
    )
  };
};

export default (App);
