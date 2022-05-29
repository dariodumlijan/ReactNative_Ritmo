// @flow
import React from 'react';
import type { Node } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import Circle from '../blocks/circle/Circle';
import Bottom from '../blocks/bottom/Bottom';
import Logo from '../../assets/icons/Logo';
import Menu from '../../assets/icons/Menu';
import { actions } from '../../store/globalStore';
import styles from '../../styles/styles';
import homeStyle from '../../styles/home_style';
import colors from '../../styles/colors';

function Home(): Node {
  const dispatch = useDispatch();

  const handleOpenNav = () => {
    dispatch(actions.toggleNavigation(true));
  };

  return (
    <SafeAreaView style={homeStyle.wrapper}>
      <View style={homeStyle.topWrapper}>
        <View style={homeStyle.topWrapperBG}>
          <View style={homeStyle.navigation}>
            <Logo style={styles.logo} fill={colors.gray} />
            <TouchableOpacity activeOpacity={0.8} onPress={handleOpenNav}>
              <Menu style={styles.menu} />
            </TouchableOpacity>
          </View>
          <Circle />
        </View>
      </View>
      <Bottom />
      <View style={styles.adSpace} />
    </SafeAreaView>
  );
}

export default Home;
