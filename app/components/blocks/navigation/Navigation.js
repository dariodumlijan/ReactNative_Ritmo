// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import { isEqual, map } from 'lodash';
import ExportMidiModal from '../../elements/modals/ExportMidiModal';
import Exit from '../../../assets/icons/Exit';
import Recordings from '../../../assets/icons/Recordings';
import Guide from '../../../assets/icons/Guide';
import Export from '../../../assets/icons/Export';
import Settings from '../../../assets/icons/Settings';
import useLocale from '../../../locales';
import { isBeatEmpty } from '../../../utils';
import { useTeleport } from '../../../utils/hooks';
import { actions } from '../../../store/globalStore';
import { selectors } from '../../../store/beatsStore';
import navigationStyle from '../../../styles/navigation';
import colors from '../../../styles/colors';
import type { Beats } from '../../../sound/beats';
import type { ReduxState } from '../../../types';

function Navigation(): Node {
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const dispatch = useDispatch();
  const navigationOpen: boolean = useSelector((state : ReduxState) => state.global.ui.navigationOpen, isEqual);
  const beats: Beats = useSelector(selectors.getBeats, isEqual);
  const opacityTag = useState(new Animated.Value(1))[0];
  const opacityAlert = useState(new Animated.Value(0))[0];
  const beatExists = !isBeatEmpty(beats);

  const links = [
    {
      path: 'settings',
      label: t('navigation.settings'),
      icon: <Settings style={navigationStyle.icon} />,
    },
    {
      path: 'library',
      label: t('navigation.library'),
      icon: <Recordings style={navigationStyle.icon} />,
    },
    {
      path: 'guide',
      label: t('navigation.guide'),
      icon: <Guide style={navigationStyle.icon} />,
    },
  ];

  const handleCloseNav = () => dispatch(actions.toggleNavigation(false));

  const fadeNavAlert = () => {
    Animated.sequence([
      Animated.timing(opacityTag, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        // $FlowFixMe
        easing: Easing.linear,
      }),
      Animated.timing(opacityAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        // $FlowFixMe
        easing: Easing.linear,
      }),
    ]).start();
    Animated.sequence([
      Animated.delay(4000),
      Animated.timing(opacityAlert, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        // $FlowFixMe
        easing: Easing.linear,
      }),
      Animated.timing(opacityTag, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        // $FlowFixMe
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
    <View style={navigationStyle.overlay}>
      <View style={navigationStyle.background}>
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
              <Link
                key={link.path}
                style={navigationStyle.link}
                underlayColor={null}
                to={link.path}
                onPress={handleCloseNav}
              >
                <View style={navigationStyle.button}>
                  <Text style={navigationStyle.label}>{link.label}</Text>
                  {link.icon}
                </View>
              </Link>
            ))}
            <TouchableOpacity style={navigationStyle.link} activeOpacity={0.6} onPress={openMidiModal}>
              <View style={navigationStyle.button}>
                <Text style={navigationStyle.label}>{t('navigation.export')}</Text>
                <Export style={navigationStyle.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Navigation;
