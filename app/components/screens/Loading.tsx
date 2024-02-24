// @flow
import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '../../assets/icons/Icon';
import useLocale from '../../locales';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: colors.bg,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 50,
    position: 'relative',
    width: '100%',
  },
  icon: {
    aspectRatio: 1 / 1,
    height: 150,
    marginTop: -150,
    position: 'absolute',
    top: '50%',
    width: 150,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
});

function Loading(): Node {
  const { t } = useLocale();

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Icon style={styles.icon} />
        <Text style={styles.text}>{t('loading')}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Loading;
