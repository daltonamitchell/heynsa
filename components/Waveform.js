import { lifecycle, withReducer, compose } from 'recompose';
import stylesheet from './waveform.scss';

function getFFT(oldBandValues) {
  const bandValues = oldBandValues.map(() => {
    return Math.random();
  });
  //"BPM" to affect first bar
  const d = new Date().getMilliseconds() % 10;
  bandValues[0] = bandValues[0] * 0.2 + d / 10 * 0.8;
  if (bandValues > 1) bandValues[1] = bandValues[1] * 0.3 + d / 10 * 0.7;
  if (bandValues > 2) bandValues[2] = bandValues[2] * 0.5 + d / 10 * 0.5;
  return bandValues;
}

function calcBand(bandValue, oldBandValue) {
  if (bandValue >= oldBandValue) oldBandValue = bandValue;
  oldBandValue -= 0.1;
  if (oldBandValue < 0) oldBandValue = 0;
  return oldBandValue;
}

function onMuteChange(mute, model, dispatch) {
  if (mute) {
    clearInterval(model.intervalId);
    dispatch({ type: 'UPDATE_SETINTERVAL_ID', intervalId: null });
  } else if(!model.intervalId){
    const intervalId = setInterval(() => {
      dispatch({ type: 'UPDATE_BAND_VALUES' });
    }, 100);
    dispatch({ type: 'UPDATE_SETINTERVAL_ID', intervalId: intervalId });
  }
}

const reducer = (model, message) => {
  switch (message.type) {
    case 'UPDATE_NUM_BANDS':
      return Object.assign({}, model, {
        numBands: message.numBands,
        bandValues: Array(message.numBands).fill(0),
        oldBandValues: Array(message.numBands).fill(0)
      });
    case 'UPDATE_BAND_VALUES':
      const newBandValues = getFFT(model.oldBandValues);
      const oldBandValues = newBandValues.map((newBandValue, index) => {
        return calcBand(newBandValue, model.oldBandValues[index]);
      });
      return Object.assign({}, model, {
        bandValues: newBandValues,
        oldBandValues: oldBandValues
      });
    case 'UPDATE_SETINTERVAL_ID':
      return Object.assign({}, model, { intervalId: message.intervalId });
    case 'UPDATE_MUTE':
      if(message.mute){
        return Object.assign({}, model, {
          mute: message.mute,
          bandValues: Array(model.numBands).fill(0),
          oldBandValues: Array(model.numBands).fill(0)
        });
      }else {
        return Object.assign({}, model, {
          mute: message.mute
        });
      }
  }
};

function updateConfig({
                        mute = false,
                        numBands = 12,
                        model,
                        dispatch
                      }) {
  if (numBands !== model.numBands) {
    if (numBands < 1) numBands = 1;
    if (numBands > 128) numBands = 128;
    dispatch({ type: 'UPDATE_NUM_BANDS', numBands: numBands });
  }

  if (mute !== model.mute) {
    onMuteChange(mute, model, dispatch);
    dispatch({ type: 'UPDATE_MUTE', mute: mute });
  }
}

const enhance = compose(
  withReducer('model', 'dispatch', reducer, {
    bandValues: Array(12).fill(0),
    oldBandValues: Array(12).fill(0),
    intervalId: null,
    numBands: 12,
    mute: false
  }),
  lifecycle({
    componentDidMount() {
      // onMuteChange(this.props.mute, this.props.model, this.props.dispatch);
      updateConfig(this.props);
    },
    componentWillReceiveProps(nextProps) {
      updateConfig(nextProps);
    }
  })
);

const Band = ({ bandValue }) => {
  return <div className="band" style={{ height: bandValue * 100 + '%' }} />;
};

export const Waveform = enhance(({ model }) => {
  return (
    <div className="waveform">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      {model.bandValues.map((bandValue, index) => {
        return <Band key={index} bandValue={bandValue} />;
      })}
    </div>
  );
});
