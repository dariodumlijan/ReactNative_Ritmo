import React from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Emoji from '../../../assets/icons/Emoji';
import colors from '../../../styles/colors';
import LightBackground from '../../elements/backgrounds/LightBackground';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  safe: {
    backgroundColor: colors.gray,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 120,
    maxWidth: 500,
    minHeight: 500,
    position: 'relative',
    width: '90%',
  },
  title: {
    color: colors.primaryDark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'left',
  },
  emoji: {
    height: 14,
    width: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 30,
    display: 'flex',
    height: 60,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    paddingHorizontal: 40,
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
});

type Props = {
  children: any,
};

type State = {
  hasError: boolean,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }) {
  //   axios.post('<api_url>/log/error', JSON.stringify({ error_log: errorInfo })).catch(() => {
  //     // eslint-disable-next-line no-console
  //     console.error('Failed to send error log...');
  //   });
  // }

  handleRestart = async () => {
    await AsyncStorage.clear();
    CodePush.restartApp();
  };

  override render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <LightBackground hideLogo />
        <SafeAreaView style={styles.safe}>
          <Text style={styles.title}>Oops...</Text>
          <Text style={styles.text}>
            It seems you encountered an error while using the app. Sorry about that.{' '}
            <Emoji style={styles.emoji} fill={colors.primaryDark} />
          </Text>
          <Text style={styles.text}>
            We are working hard to fix it and we ask for your patients, but if it happens again you can contact the team directly at:
          </Text>
          <Text
            selectable
            style={[styles.text, { color: colors.primaryDark, marginTop: -10 }]}
          >
            chimerastudiotm@gmail.com
          </Text>
          <Text style={styles.text}>
            You can reopen the app manually or by pressing the button below.
          </Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={this.handleRestart}
          >
            <Text style={styles.buttonText}>Restart the App</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default ErrorBoundary;
