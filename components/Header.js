import SoundBar from './SoundBar';

const Header = props => {
  return (
    <div>
      <SoundBar
        start={props.start}
        stop={props.stop}
        listening={props.listening}
      />
      {props.listening ? <h3>Say "NSA Stop"</h3> : <h3>Say "NSA Record" </h3>}
    </div>
  );
};

export default Header;
