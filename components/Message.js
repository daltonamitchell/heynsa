import ReactDom from 'react-dom';
import { lifecycle } from 'recompose';

const enhance = lifecycle({
  componentDidMount() {
    const myElement = ReactDom.findDOMNode(this);
    myElement.scrollIntoView();
    return null;
  }
});

const Message = ({ message }) => {
  return <li>{message}</li>;
};

export default enhance(Message);
