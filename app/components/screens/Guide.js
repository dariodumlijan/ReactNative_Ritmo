// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Link } from 'react-router-dom';
import Svg, { Path } from 'react-native-svg';
import SliderThumb from '../elements/SliderThumb';
import MidiFile from '../../assets/img/midiFile.png';
import MidiFileLogic from '../../assets/img/midiFile_Logic.png';
import useLocale from '../../locales';
import styles from '../../styles/styles';
import colors from '../../styles/colors';

type Props = {
  sliderMin: number,
  sliderMax: number,
  sliderStep: number,
};

export const Guide = (props: Props): Node => {
  const t = useLocale;
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(true);

  return (
    <View style={styles.guideWrapper}>
      <Link to="/" style={styles.exit}>
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={colors.primaryDark}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </Link>

      <ScrollView style={styles.guideScroll}>
        <Text style={styles.guideTitle}>How to use Ritmo</Text>
        <Text style={styles.guideSub}>Create your beat</Text>
        <Text style={styles.guideTxt}>Tap on any input to activate it.</Text>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.orange,
            }}
          />
          <Text style={styles.guideTxt}>ORANGE represent the Hi-Hat</Text>
        </View>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.green,
            }}
          />
          <Text style={styles.guideTxt}>GREEN represent the Snare</Text>
        </View>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.cyan,
            }}
          />
          <Text style={styles.guideTxt}>CYAN represent the Kick</Text>
        </View>

        <Text style={styles.guideTxt}>
          You can offset the individual sounds by using the sliders below the circle.
        </Text>
        <Slider
          value={15}
          minimumValue={props.sliderMin}
          maximumValue={props.sliderMax}
          step={props.sliderStep}
          minimumTrackTintColor={colors.grayLight}
          maximumTrackTintColor={colors.grayLight}
          containerStyle={[styles.sliderContainer, { marginVertical: 10 }]}
          trackStyle={styles.sliderTrack}
          renderThumbComponent={<SliderThumb label={t('hihat')} color={colors.orange} />}
          thumbTouchSize={{ width: 65, height: 25 }}
          // onValueChange={}
        />
        <Text style={styles.guideTxt}>
          Once you have activated at least one input you can start the beat. Any changes made to the
          beat while in play mode will be heard on the next interval pass.
        </Text>
        <Text style={styles.guideSub}>Settings</Text>
        <Text style={styles.guideTxt}>In the settings screen you can change:</Text>
        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={styles.guideTxt}>BPM</Text>
        </View>

        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={styles.guideTxt}>Time Signature</Text>
        </View>

        <View style={styles.guideBullet}>
          <View
            style={{
              width: 15,
              aspectRatio: 1 / 1,
              borderRadius: 15,
              marginRight: 5,
              backgroundColor: colors.grayBlue,
            }}
          />
          <Text style={styles.guideTxt}>Sound Library</Text>
        </View>

        <Text style={styles.guideTxt}>
          Any changes in the settings screen will pause your beat if it is playing so that changes
          can be applied correctly.
        </Text>
        <Text style={styles.guideSub}>Presets</Text>
        <Text style={styles.guideTxt}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Save</Text>
          {'\n'}
          Once you have a beat you can tap on a preset to save that beat. (This will save your
          configuration including the active inputs, the position of each slider, the BPM and the
          time signature)
        </Text>
        <View style={styles.guidePresetWrapper}>
          <View style={styles.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={[
                beat1 ? styles.presetBtn : styles.presetBtnEmpty,
                { paddingVertical: 8, width: '100%' },
              ]}
              onPress={() => setBeat1(!beat1)}
            >
              <Text style={styles.presetText}>Beat 1</Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}
            >
              Empty preset
            </Text>
          </View>
          <View style={styles.guidePresetCont}>
            <TouchableHighlight
              underlayColor={colors.grayBlue}
              style={[
                beat2 ? styles.presetBtn : styles.presetBtnEmpty,
                { paddingVertical: 8, width: '100%' },
              ]}
              onPress={() => setBeat2(!beat2)}
            >
              <Text style={styles.presetText}>Beat 2</Text>
            </TouchableHighlight>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
                color: colors.primaryDark,
              }}
            >
              Saved preset
            </Text>
          </View>
        </View>
        <Text style={styles.guideTxt}>
          Once saved the preset button will change colour to indicate that it can now be loaded.
          {'\n'}
          {'\n'}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Load</Text>
          {'\n'}
          To load the preset just tap it.{'\n'}
          {'\n'}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Delete</Text>
          {'\n'}
          To clear/delete the preset{' '}
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>long-press</Text> it and a window will
          appear asking you to confirm the action.
        </Text>
        <View style={styles.guideModalView}>
          <Text style={styles.modalExp}>Are you sure you want to clear the saved beat?</Text>
          <View style={styles.modalBtnCont}>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.guideSub}>Export MIDI</Text>
        <Text style={styles.guideTxt}>
          When selected you will be prompted with a window to name your MIDI file. (If no name is
          given the placeholder name &quot;
          <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>Ritmo_MIDI</Text>&quot; will be used)
          {'\n'}
          {'\n'}
          Once named you can save it, this will open up a sharing option to transfer your file to
          your computer so you can use your Ritmo beat in your DAW.
        </Text>
        <View style={styles.guideImgCont}>
          <Image style={styles.guideImg} resizeMode="contain" source={MidiFile} />
        </View>
        <Text style={styles.guideTxt}>
          The exported MIDI file is a single bar (that can be looped), with a Kick (C1 - pitch),
          Snare (D1 - pitch) and Hi-Hat (F#1 - pitch) configuration. It has a fixed velocity, an
          encoded BPM and time signature if your beat is NOT in &quot;Free time sig&quot; mode.
        </Text>
        <View style={styles.guideImgCont2}>
          <Image style={styles.guideImg} resizeMode="contain" source={MidiFileLogic} />
        </View>
        <Text style={styles.guideTxt}>
          The MIDI file is not stored in the internal phone storage unless you save it yourself
          inside the share window. (This is done to minimise app space and conserve your
          phone&apos;s storage space)
        </Text>
        <Text style={styles.guideSub}>Contact</Text>
        <Text style={styles.guideTxt}>
          If you find any bugs or have any other questions or ideas for improving Ritmo, please
          contact us at:
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'left',
            fontSize: 16,
            color: colors.primaryDark,
          }}
          selectable
        >
          chimerastudiotm@gmail.com
        </Text>
      </ScrollView>
      <View style={styles.adSpace} />
    </View>
  );
};

export default Guide;
