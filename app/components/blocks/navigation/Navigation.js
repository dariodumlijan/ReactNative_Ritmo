// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Animated, Easing, Text, TouchableOpacity, View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import { forEach, isEqual } from 'lodash';
import Exit from '../../../assets/icons/Exit';
import Recordings from '../../../assets/icons/Recordings';
import Guide from '../../../assets/icons/Guide';
import Export from '../../../assets/icons/Export';
import Settings from '../../../assets/icons/Settings';
import { selectors } from '../../../store/beatsStore';
import useLocale from '../../../locales';
import styles from '../../../styles/styles';
import navigationStyle from '../../../styles/navigation_style';
import colors from '../../../styles/colors';
import type { Beats } from '../../../sound/beats';

type Props = {
  visible: boolean,
  exit: Function,
};

function Navigation(props: Props): Node {
  const { t } = useLocale();
  const beats: Beats = useSelector(selectors.getBeats, isEqual);
  const opacityTag = useState(new Animated.Value(1))[0];
  const opacityAlert = useState(new Animated.Value(0))[0];

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

  const links = [
    {
      path: 'settings',
      label: t('navigation.settings'),
      icon: <Settings style={styles.navIcon} />,
    },
    {
      path: 'library',
      label: t('navigation.library'),
      icon: <Recordings style={styles.navIcon} />,
    },
    {
      path: 'guide',
      label: t('navigation.guide'),
      icon: <Guide style={styles.navIcon} />,
    },
  ];

  const openMidiModal = () => {
    let findBeat = false;
    forEach(beats.hihat, (o: Object, i: number) => {
      if (
        beats.hihat[i].checked === true
        || beats.snare[i].checked === true
        || beats.kick[i].checked === true
      ) {
        findBeat = true;

        return false;
      }
    });
    if (findBeat) props.exit();
    else fadeNavAlert();
  };

  if (!props.visible) return null;

  return (
    <View style={navigationStyle.wrapper}>
      <View style={navigationStyle.wrapperBG} />
      <View style={navigationStyle.nav}>
        <View style={styles.navTop}>
          <Animated.Text style={[{ opacity: opacityTag }, styles.navTag]}>
            {t('navigation.title')}
          </Animated.Text>

          <Animated.Text style={[{ opacity: opacityAlert }, styles.navTagAlert]}>
            {t('navigation.alert')}
          </Animated.Text>

          <TouchableOpacity
            style={styles.navClose}
            activeOpacity={0.6}
            onPress={() => props.exit()}
          >
            <Exit fill={colors.grayLight} />
          </TouchableOpacity>
        </View>
        <View style={styles.navItems}>
          {links.map((link) => (
            <Link
              key={link.path}
              style={styles.navBtnCont}
              underlayColor={null}
              to={link.path}
              onPress={() => props.exit()}
            >
              <View style={styles.navBtn}>
                <Text style={styles.navTxt}>{link.label}</Text>
                {link.icon}
              </View>
            </Link>
          ))}
          <TouchableOpacity style={styles.navBtnCont} activeOpacity={0.6} onPress={openMidiModal}>
            <View style={styles.navBtn}>
              <Text style={styles.navTxt}>{t('navigation.export')}</Text>
              <Export style={styles.navIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Navigation;
