import './App.css';
import { useState, useEffect } from 'react';
import Key from './components/Key';
import Toggle from './components/Toggle';
import Slider from './components/Slider';

const ON = true;
const OFF = false;
const HEATER_KIT = "Heater Kit";
const PIANO_KIT = "Smooth Piano Kit";

const audioFiles = {
  "Heater Kit": {
    "Q": { src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", name: "Heater 1"},
    "W": { src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", name: "Heater 2"},
    "E": { src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", name: "Heater 3"},
    "A": { src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", name: "Heater 4"},
    "S": { src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", name: "Heater 6"},
    "D": { src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", name: "Dsc Oh"},
    "Z": { src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", name: "Kick 'n Hat"},
    "X": { src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", name: "Kick"},
    "C": { src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", name: "Cev H2"}
  },
  "Smooth Piano Kit": {
    "Q": { src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", name: "Chord 1"},
    "W": { src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", name: "Chord 2"},
    "E": { src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", name: "Chord 3"},
    "A": { src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", name: "Lighter"},
    "S": { src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", name: "Dry Oh"},
    "D": { src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", name: "Bld H1"},
    "Z": { src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", name: "Punchy Kick"},
    "X": { src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", name: "Side Stick"},
    "C": { src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", name: "Break Snare"}
  }
};

function App() {
  const [state, setState] = useState({
    mode: HEATER_KIT,
    volume: .5,
    isOn: ON,
    last_key_press: ''
  });

  function toggleOnOff() {
    console.log(state.isOn);
    setState({
      ...state,
      isOn: state.isOn === ON ? OFF : ON
    });
  }

  function toggleMode() {
    setState({
      ...state,
      mode: state.mode === HEATER_KIT ? PIANO_KIT : HEATER_KIT,
      // clear display
      last_key_press: ''
    });
  }

  // keyboard support
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.key.toUpperCase() in audioFiles[state.mode]) && state.isOn) {
        setState({
          ...state,
          last_key_press: e.key.toUpperCase()
        });

        let audio = new Audio(audioFiles[state.mode][e.key.toUpperCase()]["src"]); 
        audio.volume = state.volume;
        audio.play().catch((e) => {});
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state]);

  return (
    <div className="app">
      <div className="container" id="drum-machine">
        <div className="keypad" id="display">
          <Key className="drum-pad" name="Q" state={state} setState={setState} audio={audioFiles[state.mode]["Q"]["src"]}/>
          <Key className="drum-pad" name="W" state={state} setState={setState} audio={audioFiles[state.mode]["W"]["src"]}/>
          <Key className="drum-pad" name="E" state={state} setState={setState} audio={audioFiles[state.mode]["E"]["src"]}/>
          <Key className="drum-pad" name="A" state={state} setState={setState} audio={audioFiles[state.mode]["A"]["src"]}/>
          <Key className="drum-pad" name="S" state={state} setState={setState} audio={audioFiles[state.mode]["S"]["src"]}/>
          <Key className="drum-pad" name="D" state={state} setState={setState} audio={audioFiles[state.mode]["D"]["src"]}/>
          <Key className="drum-pad" name="Z" state={state} setState={setState} audio={audioFiles[state.mode]["Z"]["src"]}/>
          <Key className="drum-pad" name="X" state={state} setState={setState} audio={audioFiles[state.mode]["X"]["src"]}/>
          <Key className="drum-pad" name="C" state={state} setState={setState} audio={audioFiles[state.mode]["C"]["src"]}/>
        </div>
        <div className='controls'>
          <h5>Boombox</h5>
          <div id="instrument-display"><span>{state.last_key_press ? audioFiles[state.mode][state.last_key_press]["name"] : ""}</span></div>
          <h6>Volume:</h6>
          <Slider className="volume-slider" setState={setState} state={state}/>
          <div id="mode-display">
            <Toggle id="bank-toggle" onClick={toggleMode} text="<"/>
            <h6>{state.mode}</h6>
            <Toggle id="bank-toggle" onClick={toggleMode} text=">"/>
          </div>
          <div className="toggle-container">
            <h6>Power:</h6>
            <Toggle id="power-toggle" onClick={toggleOnOff} text={state.isOn ? "TURN OFF" : "TURN ON" }/>   
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
