// @flow
import React from 'react';
import type { Node } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

function Loading(): Node {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
    </SafeAreaView>
  );
}

export default Loading;
