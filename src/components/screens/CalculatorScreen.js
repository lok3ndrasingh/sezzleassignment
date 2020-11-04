import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  outputArea: {
    backgroundColor: 'black',
    height: '25%',
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end',
  },
  keypadNumeric: {
    width: '50%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#e1e0e6',
    borderWidth: 1,
    borderColor: 'gray',
  },
  keypadNumericZero: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#e1e0e6',
    borderWidth: 1,
    borderColor: 'gray',
  },
  keypadOperatorsLeft: {
    width: '50%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#c1c0c6',
    borderWidth: 1,
    borderColor: 'gray',
  },
  keypadOperators: {
    width: '50%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#ef9c3e',
    borderWidth: 1,
    borderColor: 'gray',
  },
  outputText: {color: 'white', textAlign: 'right', fontSize: 50},
});

export default class CalculatorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      operator: '',
      initial: '0',
    };
  }

  handleOperation(input) {
    this.setState({initial: ''});
    switch (input) {
      case '.':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        {
          if (this.state.second == '0' && input == '0') {
            this.setState({second: '0'});
          } else if (this.state.second == '0' && input != '0') {
            if (input == '.') {
              let temporary = this.state.second + input;
              this.setState({second: temporary});
            } else {
              let temporary = this.state.second.slice(1) + input;
              this.setState({second: temporary});
            }
          } else {
            if (this.state.second == '' && input == '.') {
              let temporary = this.state.second + '0' + input;
              this.setState({second: temporary});
            } else if (
              this.state.second.toString().includes('.') &&
              input == '.'
            ) {
              this.setState({second: this.state.second});
            } else {
              let temporary = this.state.second + input;
              this.setState({second: temporary});
            }

            if (this.state.second.toString().includes(')')) {
              let val = this.state.second.slice(0, -1);
              val = val + input + ')';
              this.setState({second: val});
            }
          }
        }
        break;
      case 'C':
        {
          this.setState({first: '', second: '', operator: '', initial: '0'});
        }
        break;

      case '+':
      case '%':
      case '-':
      case '*':
      case '/':
        {
          const {first, second, operator} = this.state;
          if (first == '' && second == '' && operator == '') {
            this.setState({initial: '0'});
          }

          if (operator == '' && second != '') {
            this.setState({operator: input});
            this.setState({first: second});
            this.setState({second: ''});
          } else if (operator == '' && second == '') {
            this.setState({operator: ''});
          } else if (operator != '' && second != '' && first != '') {
            if (operator == '%') {
              let val = (parseFloat(first) * parseFloat(second)) / 100;
              console.log('percentage : ' + val);
              this.setState({
                second: '',
                operator: input,
                first: val.toString(),
              });
            } else {
              let exp = first + operator + second;
              let e = eval(exp);
              this.setState({second: '', operator: input, first: e.toString()});
            }
          } else {
            this.setState({operator: input});
          }
        }
        break;
      case '=':
        {
          const {first, second, operator} = this.state;
          let exp = first + operator + second;
          if (first == '' && second == '' && operator == '') {
            this.setState({initial: '0'});
          } else {
            // Special cases as per the assignment
            if (first == '100' && second == '100' && operator == '+') {
              this.setState({second: '220', operator: '', first: ''});
            } else if (first == '100' && second == '100' && operator == '-') {
              this.setState({second: '10', operator: '', first: ''});
            } else if (first == '100' && second == '100' && operator == '*') {
              this.setState({second: '140', operator: '', first: ''});
            } else if (first == '100' && second == '100' && operator == '/') {
              this.setState({second: '0', operator: '', first: ''});
            }
            //Special cases ends here
            else if (operator == '%') {
              let val = (parseFloat(first) * parseFloat(second)) / 100;
              console.log('percentage : ' + val);
              this.setState({second: val.toString(), operator: '', first: ''});
            } else {
              let e = eval(exp);
              if (e == '0') {
                this.setState({second: '0', operator: '', first: ''});
              } else
                this.setState({second: e.toString(), operator: '', first: ''});
            }
          }
        }

        break;

      case '+/-': {
        const {first, second, operator} = this.state;

        if (first == '' && second == '' && operator == '') {
          this.setState({initial: '0'});
        } else if (this.state.second == '' && input == '+/-') {
          this.setState({second: this.state.second});
        } else if (
          this.state.second != '' &&
          input == '+/-' &&
          this.state.first != ''
        ) {
          if (this.state.second.includes('-')) {
            let newVal = this.state.second.replace(/[()-]/g, '');
            this.setState({second: newVal});
          } else {
            let newVal = '(' + '-' + this.state.second + ')';
            this.setState({second: newVal});
          }
        } else if (
          this.state.second != '' &&
          input == '+/-' &&
          this.state.first == ''
        ) {
          if (this.state.second.includes('-')) {
            let newVal = this.state.second.replace(/[()-]/g, '');
            this.setState({second: newVal});
          } else {
            let newVal = '-' + this.state.second;
            this.setState({second: newVal});
          }
        }
      }
    }
  }

  render() {
    return (
      <View>
        <View style={styles.outputArea}>
          <Text style={styles.outputText}>
            {this.state.first +
              this.state.operator +
              this.state.second +
              this.state.initial}
          </Text>
        </View>
        {/* 1st Row */}
        <View style={{flexDirection: 'row', height: '15%'}}>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadOperatorsLeft}
              onPress={() => this.handleOperation('C')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadOperatorsLeft}
              onPress={() => this.handleOperation('+/-')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>+/-</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadOperatorsLeft}
              onPress={() => this.handleOperation('%')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadOperators}
              onPress={() => this.handleOperation('/')}>
              <Text style={{fontSize: 40, color: 'white'}}>/</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 2nd row */}
        <View style={{flexDirection: 'row', height: '15%'}}>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('7')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('8')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>8</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('9')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadOperators}
              onPress={() => this.handleOperation('*')}>
              <Text style={{fontSize: 40, color: 'white'}}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 3rd Row */}
        <View style={{flexDirection: 'row', height: '15%'}}>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('4')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('5')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>5</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('6')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadOperators}
              onPress={() => this.handleOperation('-')}>
              <Text style={{fontSize: 40, color: 'white'}}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 4th Row */}
        <View style={{flexDirection: 'row', height: '15%'}}>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('1')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('2')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>2</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('3')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadOperators}
              onPress={() => this.handleOperation('+')}>
              <Text style={{fontSize: 40, color: 'white'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Fifth row for input buttons */}
        <View style={{flexDirection: 'row', height: '15%'}}>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumericZero}
              onPress={() => this.handleOperation('0')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.keypadNumeric}
              onPress={() => this.handleOperation('.')}>
              <Text style={{fontSize: 40, color: '#2c2c2c'}}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadOperators}
              onPress={() => this.handleOperation('=')}>
              <Text style={{fontSize: 40, color: 'white'}}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
