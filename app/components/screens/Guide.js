// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Link } from 'react-router-native';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import Svg, { Path } from 'react-native-svg';
import SliderThumb from '../elements/inputs/SliderThumb';
import MidiFile from '../../assets/img/midiFile.png';
import MidiFileLogic from '../../assets/img/midiFile_Logic.png';
import useLocale from '../../locales';
import styles from '../../styles/styles';
import guideStyle from '../../styles/guide_style';
import bottomStyle from '../../styles/bottom_style';
import colors from '../../styles/colors';
import type { ReduxState } from '../../types';

export const Guide = (): Node => {
  const { t } = useLocale();
  const config = useSelector((state: ReduxState) => ({
    sliderMin: state.static.sliderMin,
    sliderMax: state.static.sliderMax,
    sliderStep: state.static.sliderStep,
  }), isEqual);
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(true);
  const [slider, setSlider] = useState(15);

  return (
    <SafeAreaView style={guideStyle.wrapper}>
      <Link to="/" style={styles.exit} underlayColor={null}>
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={colors.primaryDark}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </Link>

      <ScrollView style={guideStyle.guideScroll}>
        <Text style={guideStyle.guideTitle}>{t('guide.title')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_1.title')}</Text>
        <Text style={guideStyle.guideTxt}>{t('guide.section_1.paragraph_1')}</Text>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.orange,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_1.bullet_1')}</Text>
        </View>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.green,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_1.bullet_2')}</Text>
        </View>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.cyan,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_1.bullet_3')}</Text>
        </View>

        <Text style={guideStyle.guideTxt}>{t('guide.section_1.paragraph_2')}</Text>
        <Slider
          value={slider}
          minimumValue={config.sliderMin}
          maximumValue={config.sliderMax}
          step={config.sliderStep}
          minimumTrackTintColor={colors.grayLight}
          maximumTrackTintColor={colors.grayLight}
          containerStyle={[styles.sliderContainer, { marginVertical: 10 }]}
          trackStyle={styles.sliderTrack}
          renderThumbComponent={() => <SliderThumb label={t('hihat')} color={colors.orange} />}
          thumbTouchSize={{ width: 65, height: 25 }}
          onValueChange={(val) => setSlider(val)}
        />
        <Text style={guideStyle.guideTxt}>{t('guide.section_1.paragraph_3')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_2.title')}</Text>
        <Text style={guideStyle.guideTxt}>{t('guide.section_2.paragraph_1')}</Text>
        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_2.bullet_1')}</Text>
        </View>

        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_2.bullet_2')}</Text>
        </View>

        <View style={guideStyle.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={guideStyle.guideTxt}>{t('guide.section_2.bullet_3')}</Text>
        </View>

        <Text style={guideStyle.guideTxt}>{t('guide.section_2.paragraph_2')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_3.title')}</Text>
        <Text style={guideStyle.guideTxt}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_1.title')}
          </Text>
          {t('guide.section_3.subsection_1.paragraph_1')}
        </Text>
        <View style={guideStyle.guidePresetWrapper}>
          <View style={guideStyle.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={{
                ...bottomStyle.presetBtn,
                ...{ paddingVertical: 8, width: '100%' },
                ...(beat1 && {
                  borderColor: colors.gray,
                  backgroundColor: colors.bg,
                }),
              }}
              onPress={() => setBeat1(!beat1)}
            >
              <Text style={bottomStyle.presetText}>
                {t('guide.section_3.subsection_1.button_1')}
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}
            >
              {t('guide.section_3.subsection_1.button_desc_1')}
            </Text>
          </View>
          <View style={guideStyle.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={{
                ...bottomStyle.presetBtn,
                ...{ paddingVertical: 8, width: '100%' },
                ...(beat2 && {
                  borderColor: colors.gray,
                  backgroundColor: colors.bg,
                }),
              }}
              onPress={() => setBeat2(!beat2)}
            >
              <Text style={bottomStyle.presetText}>
                {t('guide.section_3.subsection_1.button_2')}
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}
            >
              {t('guide.section_3.subsection_1.button_desc_2')}
            </Text>
          </View>
        </View>
        <Text style={guideStyle.guideTxt}>
          {t('guide.section_3.subsection_1.paragraph_2')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_2.title')}
          </Text>
          {t('guide.section_3.subsection_2.paragraph_1')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_3.title')}
          </Text>
          {t('guide.section_3.subsection_3.paragraph_1')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_3.subsection_3.bold_1')}
          </Text>
          {t('guide.section_3.subsection_3.paragraph_2')}
        </Text>
        <View style={guideStyle.guideModalView}>
          <Text style={styles.modalExp}>{t('guide.section_3.subsection_3.modal.text')}</Text>
          <View style={styles.modalBtnCont}>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>{t('guide.section_3.subsection_3.modal.yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>{t('guide.section_3.subsection_3.modal.no')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={guideStyle.guideSub}>{t('guide.section_4.title')}</Text>
        <Text style={guideStyle.guideTxt}>
          {t('guide.section_4.paragraph_1')}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
            {t('guide.section_4.paragraph_2')}
          </Text>
          {t('guide.section_4.paragraph_3')}
        </Text>
        <View style={guideStyle.guideImgCont}>
          <Image style={guideStyle.guideImg} resizeMode="contain" source={MidiFile} />
        </View>
        <Text style={guideStyle.guideTxt}>{t('guide.section_4.paragraph_4')}</Text>
        <View style={guideStyle.guideImgCont2}>
          <Image style={guideStyle.guideImg} resizeMode="contain" source={MidiFileLogic} />
        </View>
        <Text style={guideStyle.guideTxt}>{t('guide.section_4.paragraph_5')}</Text>
        <Text style={guideStyle.guideSub}>{t('guide.section_5.title')}</Text>
        <Text style={guideStyle.guideTxt}>{t('guide.section_5.paragraph_1')}</Text>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'left',
            fontSize: 16,
            color: colors.primaryDark,
          }}
          selectable
        >
          {t('guide.section_5.email')}
        </Text>
      </ScrollView>
      <View style={styles.adSpace} />
    </SafeAreaView>
  );
};

export default Guide;
