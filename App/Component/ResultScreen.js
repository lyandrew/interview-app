import React, {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class ResultScreen extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Score: {this.props.score}</Text>
        <TouchableHighlight onPress={() => {this.props.onConfirm()}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Return Home</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0eb',
    alignSelf: 'stretch',
    marginTop: 56
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '500',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    marginBottom: 5,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#29293d',
    height: 44,
    width: 200,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
