// @flow
import React from 'react';
import type { Node } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import codePush from 'react-native-code-push';
import Circle from '../blocks/circle/Circle';
import Bottom from '../blocks/bottom/Bottom';
import Logo from '../../assets/icons/Logo';
import Menu from '../../assets/icons/Menu';
import { actions, selectors } from '../../store/globalStore';
import { deviceInfo } from '../../utils';
import { codepush } from '../../tokens';
import mainStyle from '../../styles/main';
import homeStyle from '../../styles/home';
import colors from '../../styles/colors';

function Home(): Node {
  const dispatch = useDispatch();
  const codepushEnvironment = useSelector(selectors.getCodepushEnvironment);

  const handleOpenNav = () => {
    dispatch(actions.toggleNavigation(true));
  };

  const handleAppEnvironment = () => {
    const isProduction = codepushEnvironment === 'Production';
    const key = isProduction ? codepush[deviceInfo.isApple ? 'ios' : 'android'].staging : codepush[deviceInfo.isApple ? 'ios' : 'android'].production;

    codePush.clearUpdates();
    codePush.sync({
      deploymentKey: key,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  return (
    <SafeAreaView style={homeStyle.wrapper}>
      <View style={homeStyle.topWrapper}>
        <View style={homeStyle.topWrapperBG}>
          <View style={homeStyle.navigation}>
            <Logo style={homeStyle.logo} fill={colors.gray} />
            {deviceInfo.showAdminActions && (
              <TouchableOpacity style={homeStyle.appEnvironment} activeOpacity={0.8} onPress={handleAppEnvironment}>
                <Text style={homeStyle.appEnvironmentText}>{codepushEnvironment}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity activeOpacity={0.8} onPress={handleOpenNav}>
              <Menu style={homeStyle.menu} />
            </TouchableOpacity>
          </View>
          <Circle />
        </View>
      </View>
      <Bottom />
      <View style={mainStyle.adSpace} />
    </SafeAreaView>
  );
}

export default Home;
