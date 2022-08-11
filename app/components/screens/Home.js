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
import useLocale from '../../locales';
import { actions, selectors } from '../../store/globalStore';
import { showAppVersioning } from '../../utils';
import { codepush } from '../../tokens';
import mainStyle from '../../styles/main';
import homeStyle from '../../styles/home';
import colors from '../../styles/colors';

function Home(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const codepushKey = useSelector(selectors.getCodepushKey);
  const isProduction = codepushKey === codepush.production;

  const handleOpenNav = () => {
    dispatch(actions.toggleNavigation(true));
  };

  const handleAppVersion = () => {
    const key = isProduction ? codepush.staging : codepush.production;
    codePush.sync({ deploymentKey: key });
    dispatch(actions.toggleAppVersion(key));
  };

  return (
    <SafeAreaView style={homeStyle.wrapper}>
      <View style={homeStyle.topWrapper}>
        <View style={homeStyle.topWrapperBG}>
          <View style={homeStyle.navigation}>
            <Logo style={homeStyle.logo} fill={colors.gray} />
            {showAppVersioning && (
              <TouchableOpacity style={homeStyle.appVersion} activeOpacity={0.8} onPress={handleAppVersion}>
                <Text style={homeStyle.appVersionText}>{t(`app_version.${isProduction ? 'production' : 'staging'}`)}</Text>
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
