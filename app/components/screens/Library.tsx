import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Link } from 'react-router-native';
import Exit from '../../assets/icons/Exit';
import colors from '../../styles/colors';
import mainStyle from '../../styles/main';

function Library() {
  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link to="/" style={mainStyle.exit} underlayColor={colors.transparent}>
        <Exit fill={colors.primaryDark} />
      </Link>
      <Text>Recordings</Text>
    </SafeAreaView>
  );
}

export default Library;
