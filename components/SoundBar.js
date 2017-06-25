import {Waveform} from './Waveform';

const SoundBar = ({ start, stop, listening }) => {
  return (
    <div>
      <div id="SoundBar" className="flex items-center">
        <div className="w-100 h4 ma2 pb1 pa3 bg-black-90 br4">
          <Waveform numBands={12} mute={!listening}/>
        </div>
        <div className="controls ma3">
          {
            listening ?
              <div id="stop" onClick={stop} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-silver di">
                <i className="fa fa-microphone-slash" aria-hidden="true"></i>
              </div> :
              <div id="start" onClick={start} className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-red di">
                <i className="fa fa-microphone" aria-hidden="true"></i>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SoundBar;
