import React, { Component, Fragment } from 'react';
import { Icon, List, Grid, Segment, Header, Divider } from 'semantic-ui-react';
const io = require('socket.io-client');

class AllOpinions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opinionList: [],
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:5000');
    socket.on('new-opinions', opinions => {
      const mappedOpinions = opinions.map(opinion => {
        const { improvement, isImprovement, text, _id, createdDate } = opinion;
        return {
          id: _id,
          createdDate,
          recommendation: improvement,
          isImprovement,
          text
        }
      });
      this.setState({ opinionList: mappedOpinions });
    })
  }

  render() {
    const opinions = [...this.state.opinionList];
    const badOpinions = [];
    const goodOpinions = [];
    opinions.forEach(opinion => {
      if (opinion.isImprovement) {
        badOpinions.push(opinion);
      } else {
        goodOpinions.push(opinion);
      }
    });
    return (
      <Fragment>
        <Grid container columns={2} stackable>
          <Grid.Column>
            <Segment>
              <Header as='h3'> What went well?</Header>
              <Divider fitted />
              <List>
                {goodOpinions && goodOpinions.map(opinion => {
                  return (
                    <List.Item key={opinion.id}>
                      <List.Content floated='right'>
                      </List.Content>
                      <Icon name='thumbs up' color='green'></Icon>
                      <List.Content>
                        <List.Header>{opinion.text}</List.Header>
                      </List.Content>
                    </List.Item>
                  )
                })}
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h3'> What went less well?</Header>
              <Divider fitted />
              <List>
                {badOpinions && badOpinions.map(opinion => {
                  return (
                    <List.Item key={opinion.id}>
                      <List.Content floated='right'>
                      </List.Content>
                      <Icon name='thumbs down' color='red'></Icon>
                      <List.Content>
                        <List.Header>{opinion.text}</List.Header>
                        {opinion.recommendation}
                      </List.Content>
                    </List.Item>
                  )
                })}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>

      </Fragment>
    )
  };
}

export default AllOpinions;
