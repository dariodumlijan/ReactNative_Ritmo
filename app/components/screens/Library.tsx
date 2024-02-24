// @flow
import React from 'react';
import type { Node } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Link } from 'react-router-native';
import Exit from '../../assets/icons/Exit';
import mainStyle from '../../styles/main';
import colors from '../../styles/colors';

function Library(): Node {
  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link to="/" style={mainStyle.exit} underlayColor={null}>
        <Exit fill={colors.primaryDark} />
      </Link>
      <Text>Recordings</Text>
    </SafeAreaView>
  );
}

export default Library;
