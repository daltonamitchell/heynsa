const SoundBar = ({ start, stop }) => {
  return (
    <div>
      <div id="SoundBar">
        <div className="controls">
          <button id="start" onClick={start}>Start</button>
          <button id="stop" onClick={stop}>Stop</button>
        </div>
        <div>
          <p>this is the soundbar component</p>
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
