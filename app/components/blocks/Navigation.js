// @flow
import React from 'react';
import type { Node } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import Exit from '../../assets/icons/Exit';
import Recordings from '../../assets/icons/Recordings';
import Guide from '../../assets/icons/Guide';
import Export from '../../assets/icons/Export';
import Settings from '../../assets/icons/Settings';
import styles from '../../styles/styles';
import colors from '../../styles/colors';

type Props = {};

function Navigation(props: Props): Node {
  return (
    <Animated.View style={[moveNav, styles.nav]}>
      <View style={styles.navWrapper}>
        <View style={styles.navTop}>
          <Animated.Text style={[{ opacity: opacityTag }, styles.navTag]}>
            Redefine Beatmaking
          </Animated.Text>

          <Animated.Text style={[{ opacity: opacityAlert }, styles.navTagAlert]}>
            Nothing to export!
          </Animated.Text>

          <TouchableOpacity
            style={styles.navClose}
            activeOpacity={0.6}
            onPress={() => openNav(false)}
          >
            <Exit fill={colors.grayLight} />
          </TouchableOpacity>
        </View>
        <View style={styles.navItems}>
          <TouchableOpacity style={styles.navBtnCont} activeOpacity={0.6} onPress={openMenuCall}>
            <View style={styles.navBtn}>
              <Text style={styles.navTxt}>Settings</Text>
              <Settings style={styles.navIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtnCont}
            activeOpacity={0.6}
            onPress={() => openLibrary(true)}
          >
            <View style={styles.navBtn}>
              <Text style={styles.navTxt}>Recordings</Text>
              <Recordings style={styles.navIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtnCont}
            activeOpacity={0.6}
            onPress={() => openGuide(true)}
          >
            <View style={styles.navBtn}>
              <Text style={styles.navTxt}>How to use</Text>
              <Guide style={styles.navIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtnCont} activeOpacity={0.6} onPress={openMidiModal}>
            <View style={styles.navBtn}>
              <Text style={styles.navTxt}>Export MIDI</Text>
              <Export style={styles.navIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

export default Navigation;
