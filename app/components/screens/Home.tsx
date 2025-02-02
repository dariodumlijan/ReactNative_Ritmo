import React from 'react';
import {
  SafeAreaView, ScrollView, TouchableOpacity, View,
} from 'react-native';
import Logo from '@assets/icons/Logo';
import Menu from '@assets/icons/Menu';
import Bottom from '@components/containers/bottom/Bottom';
import Circle from '@components/containers/circle/Circle';
import { actions } from '@store/globalStore';
import colors from '@styles/colors';
import homeStyle from '@styles/home';
import mainStyle from '@styles/main';
import { useAppDispatch } from '@utils/hooks';

function Home() {
  const dispatch = useAppDispatch();

  const handleOpenNav = () => {
    dispatch(actions.toggleNavigation(true));
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={mainStyle.scrollDeviceContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <SafeAreaView style={homeStyle.wrapper}>
        <View style={homeStyle.topWrapper}>
          <View style={homeStyle.topWrapperBG}>
            <View style={homeStyle.navigation}>
              <Logo style={homeStyle.logo} fill={colors.gray} />
              <TouchableOpacity style={homeStyle.menu} activeOpacity={0.8} onPress={handleOpenNav}>
                <Menu />
              </TouchableOpacity>
            </View>
            <Circle />
          </View>
        </View>
        <Bottom />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Home;
