import React, {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class QuestionScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log(this.props.result)
    if (this.props.result == "Correct"){
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Correct: {this.props.explaination}</Text>
          <TouchableHighlight onPress={() => {this.props.onConfirm()}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else if (this.props.result == "Incorrect") {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Incorrect: {this.props.explaination}</Text>
          <TouchableHighlight onPress={() => {this.props.onConfirm()}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (null);
    }

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
