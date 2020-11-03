import React, { Component } from 'react';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';


export default class SettingsPage extends Component {
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <ListItem onPress= {() => this.props.navigation.navigate('Setup')} icon>
            <Left>
              <Button style={{ backgroundColor: "#2E434E" }}>
                <Icon active name="settings" />
              </Button>
            </Left>
            <Body>
              <Text>Set Up Device</Text>
            </Body> 
          </ListItem>
          {/* <ListItem onPress= {() => this.props.navigation.navigate('Home')} icon>
            <Left>
              <Button style={{ backgroundColor: "#2E434E" }}>
                <Icon active name="log-in" />
              </Button>
            </Left>
            <Body>
              <Text>Go to Surveys</Text>
            </Body>
          </ListItem > */}
          {/* <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem> */}
        </Content>
      </Container>
    );
  }
}