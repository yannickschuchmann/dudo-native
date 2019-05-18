import React, {Component} from 'react'
import {StyleSheet, StatusBar, Text} from 'react-native'
import {Container} from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'

import {withNamespaces} from 'react-i18next'

class LoadingBattle extends Component {
  state = {friendBattle: this.props.navigation.state.params.friendBattle}
  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Grid>
          {this.state.friendBattle ? (
            <Col>
              <Row>
                <Text>Loading Friend Battle</Text>
              </Row>
            </Col>
          ) : (
            <Col>
              <Row>
                <Text>Loading Anonymous Battle</Text>
              </Row>
            </Col>
          )}
        </Grid>
      </Container>
    )
  }
}

export default withNamespaces(['common'], {wait: true})(LoadingBattle)

const styles = StyleSheet.create({})
