import {Waveform} from './Waveform';

const SoundBar = ({ start, stop, listening }) => {
  return (
    <div>
      <div id="SoundBar">
        <div className="controls">
          <button id="start" onClick={start}>Start</button>
          <button id="stop" onClick={stop}>Stop</button>
        </div>
        <div style={{width: '100%', height: '100px'}}>
            <Waveform numBands={12} mute={!listening}/>
        </div>
      </div>

      <style jsx>{`
        #SoundBar {
          height: 100px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default SoundBar;
