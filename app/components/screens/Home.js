// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import codePush from 'react-native-code-push';
import Circle from '../blocks/circle/Circle';
import Bottom from '../blocks/bottom/Bottom';
import Logo from '../../assets/icons/Logo';
import Menu from '../../assets/icons/Menu';
import Alert from '../elements/misc/Alert';
import { actions, selectors } from '../../store/globalStore';
import useLocale from '../../locales';
import { deviceInfo } from '../../utils';
import { codepush } from '../../tokens';
import mainStyle from '../../styles/main';
import homeStyle from '../../styles/home';
import notificationsStyle from '../../styles/notifications';
import colors from '../../styles/colors';

function Home(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const codepushEnvironment = useSelector(selectors.getCodepushEnvironment);
  const [codepushSyncing, setCodepushSyncing] = useState(false);
  const isProduction = codepushEnvironment === 'Production';

  const handleOpenNav = () => {
    dispatch(actions.toggleNavigation(true));
  };

  const handleAppEnvironment = () => {
    const key = isProduction ? codepush[deviceInfo.isApple ? 'ios' : 'android'].staging : codepush[deviceInfo.isApple ? 'ios' : 'android'].production;

    setCodepushSyncing(true);
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

      <Modal animationType="fade" visible={codepushSyncing} transparent>
        <Alert>
          <Text style={[notificationsStyle.alertText, { fontSize: 14 }]}>
            {t('alert.codepush_syncing.text_1')}
            {t('alert.codepush_syncing.' + codepushEnvironment)}
            {t('alert.codepush_syncing.text_2')}
          </Text>
        </Alert>
      </Modal>
    </SafeAreaView>
  );
}

export default Home;
