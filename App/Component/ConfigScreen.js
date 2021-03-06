import React, {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class ConfigScreen extends React.Component {
  constructor (props) {
    super(props)
    this.choices = this.props.properties.choices;
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.properties.text}
        </Text>
        {this.choices.map((choice) => {
          return (
            <TouchableHighlight key={choice} onPress={() => this.props.onSelection(choice)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{choice}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
        <Text style={styles.instructions}>
          {this.props.properties.direction}
        </Text>
      </View>
    );
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
