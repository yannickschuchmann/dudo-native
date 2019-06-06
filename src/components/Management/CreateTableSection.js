import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button } from 'native-base'
import { Col, Row } from 'react-native-easy-grid'

import { withNamespaces } from 'react-i18next'
import { scaleFontSize } from '../../helpers/responsive'

export class CreateTableSection extends Component {
  render () {
    const { t } = this.props

    return (
      <Row>
        <Col style={styles.topRowContainer}>
          <Text style={styles.textTables}>{t('common:tablesText')}</Text>
        </Col>
        <Col style={styles.topRowContainer}>
          <Button
            primary
            style={styles.createTableButton}
            onPress={() => {
              this.props.navigation.push('CreateTable')
            }}
          >
            <Text style={styles.createButtonText}>
              {t('common:createText')}
            </Text>
          </Button>
        </Col>
      </Row>
    )
  }
}

export default withNamespaces(['common'], { wait: true })(CreateTableSection)

const styles = StyleSheet.create({
  topRowContainer: {
    padding: '3%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createTableButton: {
    backgroundColor: 'rgba(149,121,42,1)',
    borderRadius: 10,
    margin: '5%',
    width: '70%'
  },
  createButtonText: {
    flex: 1,
    fontSize: scaleFontSize(30),
    fontFamily: 'MyriadPro-BoldCond',
    textAlign: 'center',
    color: 'white'
  },
  textTables: {
    backgroundColor: 'transparent',
    color: 'rgba(149,121,42,1)',
    fontFamily: 'MyriadPro-BoldCond',
    fontSize: scaleFontSize(40)
  }
})
