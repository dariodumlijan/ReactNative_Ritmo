import React, { useRef } from 'react';
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Link } from 'react-router-native';
import { useTeleport } from '@app/context';
import Exit from '@assets/icons/Exit';
import Export from '@assets/icons/Export';
import Guide from '@assets/icons/Guide';
import Settings from '@assets/icons/Settings';
import StateTree from '@assets/icons/StateTree';
import ExportMidiModal from '@components/elements/modals/ExportMidiModal';
import useLocale from '@locales';
import { selectors } from '@store/beatsStore';
import { actions } from '@store/globalStore';
import colors from '@styles/colors';
import navigationStyle from '@styles/navigation';
import { isBeatEmpty } from '@utils';
import { useAppDispatch, useAppSelector } from '@utils/hooks';
import { isEqual, map } from 'lodash';
import type { Beats } from '@sound/beats';

function Navigation() {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useAppDispatch();
  const developerMode = useAppSelector((state) => state.global.developerMode, isEqual);
  const navigationOpen = useAppSelector((state) => state.global.ui.navigationOpen, isEqual);
  const beats: Beats = useAppSelector(selectors.getBeats, isEqual);
  const opacityTag = useRef(new Animated.Value(1)).current;
  const opacityAlert = useRef(new Animated.Value(0)).current;
  const beatExists = !isBeatEmpty(beats);

  const links = [
    {
      path: 'settings',
      label: t('navigation.settings'),
      icon: <Settings style={navigationStyle.icon} />,
      visible: true,
    },
    {
      path: 'export',
      label: t('navigation.export'),
      icon: <Export style={navigationStyle.icon} />,
      visible: true,
    },
    {
      path: 'guide',
      label: t('navigation.guide'),
      icon: <Guide style={navigationStyle.icon} />,
      visible: true,
    },
    {
      path: 'dev',
      label: t('navigation.dev'),
      icon: <StateTree style={navigationStyle.icon} />,
      visible: developerMode,
    },
  ];

  const handleCloseNav = () => dispatch(actions.toggleNavigation(false));

  const fadeNavAlert = () => {
    Animated.sequence([
      Animated.timing(opacityTag, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(opacityAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
    Animated.sequence([
      Animated.delay(4000),
      Animated.timing(opacityAlert, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(opacityTag, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  };

  const openMidiModal = () => {
    if (beatExists) {
      teleport(<ExportMidiModal />);
      handleCloseNav();
    } else fadeNavAlert();
  };

  if (!navigationOpen) return null;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => handleCloseNav()}>
        <View style={navigationStyle.overlay} />
      </TouchableWithoutFeedback>
      <View style={navigationStyle.background} />
      <View style={navigationStyle.nav}>
        <View style={navigationStyle.top}>
          <Animated.Text style={[navigationStyle.tagline, { opacity: opacityTag }]}>
            {t('navigation.title')}
          </Animated.Text>
          <Animated.Text style={[navigationStyle.tagline, { opacity: opacityAlert }]}>
            {t('navigation.alert')}
          </Animated.Text>
          <TouchableOpacity
            style={navigationStyle.close}
            activeOpacity={0.6}
            onPress={handleCloseNav}
          >
            <Exit fill={colors.grayLight} />
          </TouchableOpacity>
        </View>
        <View style={navigationStyle.linksWrapper}>
          {map(links, (link) => (
            <React.Fragment key={link.path}>
              {link.visible && link.path !== 'export' && (
                <Link
                  style={navigationStyle.link}
                  underlayColor={colors.transparent}
                  to={link.path}
                  onPress={handleCloseNav}
                >
                  <View style={navigationStyle.button}>
                    <Text style={navigationStyle.label}>{link.label}</Text>
                    {link.icon}
                  </View>
                </Link>
              )}
              {link.visible && link.path === 'export' && (
                <TouchableOpacity style={navigationStyle.link} activeOpacity={0.6} onPress={openMidiModal}>
                  <View style={navigationStyle.button}>
                    <Text style={navigationStyle.label}>{t('navigation.export')}</Text>
                    <Export style={navigationStyle.icon} />
                  </View>
                </TouchableOpacity>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </>
  );
}

export default Navigation;
