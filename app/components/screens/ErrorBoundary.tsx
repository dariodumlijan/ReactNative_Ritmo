/* eslint-disable no-console */
import React from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View,
} from 'react-native';
import Emoji from '@assets/icons/Emoji';
import LightBackground from '@components/elements/backgrounds/LightBackground';
import Hr from '@components/elements/misc/Hr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Font } from '@styles';
import colors from '@styles/colors';
import { deviceInfo } from '@utils';

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
  scrollDeviceContainer: {
    flexGrow: 1,
    minHeight: '100%',
    width: '100%',
  },
  title: {
    color: colors.primaryDark,
    fontFamily: Font.semiBold,
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: Font.regular,
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
    fontFamily: Font.semiBold,
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: colors.red,
    fontFamily: Font.regular,
    fontSize: 12,
    marginVertical: 12,
    textAlign: 'left',
  },
});

type Props = {
  children: any,
};

type State = {
  hasError: boolean,
  error: Error | null
  stacktrace: string
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      stacktrace: '',
    };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, error: null, stacktrace: '' };
  }

  override componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({ error, stacktrace: errorInfo.componentStack });
    console.log('----ERROR----');
    console.error(error);
    console.log('-------------');
    console.error(errorInfo.componentStack);
    console.log('----ERROR----');

    AsyncStorage.clear().catch(() => {});
  }

  override render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <LightBackground />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollDeviceContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
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
            {!deviceInfo.isRealDevice && (
            <>
              <Hr />
              {this.state.error && (
                <Text style={styles.error}>
                  Name: {this.state.error?.name}{'\n'}
                  Message: {this.state.error?.message}
                </Text>
              )}
              <Hr />
              {this.state.stacktrace && (
                <Text style={styles.error}>
                  Stacktrace: {this.state.stacktrace}
                </Text>
              )}
            </>
            )}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

export default ErrorBoundary;
