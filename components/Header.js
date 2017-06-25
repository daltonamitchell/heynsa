import SoundBar from './SoundBar';

const Header = props => {
  return (
    <div>
      <SoundBar start={props.start} stop={props.stop} />
      {
        props.listening ?
          <h3>Say "NSA Stop"</h3> :
          <h3>Say "NSA Listen" </h3>
      }
    </div>
  );
};

export default Header;
