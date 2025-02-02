import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { Link } from 'react-router-native';
import Exit from '@assets/icons/Exit';
import colors from '@styles/colors';
import mainStyle from '@styles/main';
import * as utils from '@utils';
import { useAppSelector } from '@utils/hooks';
import { includes, isEqual } from 'lodash';

function Dev() {
  const store = useAppSelector((state) => state, isEqual);

  const theme = {
    base00: colors.transparent, // BACKGROUND
    base01: '#303030', // ???
    base02: '#505050', // ???
    base03: colors.grayBlue, // KEY_NUMBER_OPEN
    base04: '#d0d0d0', // ???
    base05: '#e0e0e0', // ???
    base06: '#f5f5f5', // ???
    base07: colors.black, // ???
    base08: colors.red, // NULL
    base09: colors.orange, // NUMBERS & BOOLEAN
    base0A: colors.orange, // ???
    base0B: colors.orange, // STRING & KEY_NUMBER_CLOSED
    base0C: '#76c7b7', // ???
    base0D: colors.primary, // KEYS
    base0E: '#d381c3', // ???
    base0F: colors.orange, // ???
  };

  return (
    <SafeAreaView style={mainStyle.safe}>
      <Link to="/" style={mainStyle.exit} underlayColor={colors.transparent}>
        <Exit fill={colors.primaryDark} />
      </Link>
      <ScrollView
        style={{
          backgroundColor: colors.whiteTransparent,
          borderRadius: 10,
          flex: 1,
          marginBottom: 20,
          marginTop: utils.isTablet ? '22%' : '12%',
          overflow: 'hidden',
        }}
        contentContainerStyle={mainStyle.scrollDeviceContainer}
        showsVerticalScrollIndicator
      >
        <JSONTree
          data={{
            utils: {
              ...utils.deviceInfo,
              deviceHeight: utils.deviceHeight,
              deviceWidth: utils.deviceWidth,
            },
            redux: store,
          }}
          theme={theme}
          invertTheme={false}
          shouldExpandNode={(key) => includes(key, 'utils')}
          hideRoot
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dev;
