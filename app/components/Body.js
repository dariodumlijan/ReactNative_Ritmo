// @flow
import React from 'react';
import type { Node } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Library from './screens/Library';
import Guide from './screens/Guide';
import Rewarded from './screens/Rewarded';

/* General Configurations */
const sliderMin = 0;
const sliderMax = 90;
const sliderStep = 5;
const stepsInBar = 360 / sliderStep;
const midiNoteMin = 8;
const midiNoteMax = 64;
const midiBarTicks = 512;
const countdownHours = 24;
const refreshHours = 5;
const reviewMinutes = 2;
const reviewWait = new Date().valueOf() + reviewMinutes * 6e4;

function Body(): Node {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/library" element={<Library />} />
        <Route
          exact
          path="/guide"
          element={<Guide sliderMin={sliderMin} sliderMax={sliderMax} sliderStep={sliderStep} />}
        />
        <Route path="/rewarded" element={<Rewarded />} />
      </Routes>
    </Router>
  );
}

export default Body;
