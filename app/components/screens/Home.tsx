import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';
import { isEqual } from 'lodash';
import Logo from '../../assets/icons/Logo';
import Menu from '../../assets/icons/Menu';
import useLocale from '../../locales';
import { actions, selectors } from '../../store/globalStore';
import colors from '../../styles/colors';
import homeStyle from '../../styles/home';
import mainStyle from '../../styles/main';
import notificationsStyle from '../../styles/notifications';
import { codepush } from '../../tokens';
import { deviceInfo } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import Bottom from '../blocks/bottom/Bottom';
import Circle from '../blocks/circle/Circle';
import Alert from '../elements/misc/Alert';

function Home() {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const developerMode: boolean = useAppSelector((state) => state.global.developerMode, isEqual);
  const codepushEnvironment = useAppSelector(selectors.getCodepushEnvironment, isEqual);
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
            {developerMode && (
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
