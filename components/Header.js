import SoundBar from './SoundBar';

const Header = props => {
  return (
    <div>
      <SoundBar start={props.start} stop={props.stop} />
      <h1>Hello {props.name}</h1>
    </div>
  );
};

export default Header;
