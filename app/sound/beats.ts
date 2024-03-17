export type Beat = {
  angle: number,
  checked: boolean,
  initAngle: number,
  timeSig: string,
  visible: boolean,
};

export type Beats = {
  hihat: Beat[],
  snare: Beat[],
  kick: Beat[],
};

const initBeat: Beat[] = [
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 0,
    initAngle: 0,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 30,
    initAngle: 30,
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 45,
    initAngle: 45,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 60,
    initAngle: 60,
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 90,
    initAngle: 90,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 120,
    initAngle: 120,
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 135,
    initAngle: 135,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 150,
    initAngle: 150,
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 180,
    initAngle: 180,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 210,
    initAngle: 210,
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 225,
    initAngle: 225,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 240,
    initAngle: 240,
  },
  {
    checked: false,
    timeSig: 'Free',
    visible: true,
    angle: 270,
    initAngle: 270,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 300,
    initAngle: 300,
  },
  {
    checked: false,
    timeSig: '4/4',
    visible: true,
    angle: 315,
    initAngle: 315,
  },
  {
    checked: false,
    timeSig: '3/4',
    visible: true,
    angle: 330,
    initAngle: 330,
  },
];

const beats: Beats = {
  hihat: initBeat,
  snare: initBeat,
  kick: initBeat,
};

export default beats;
