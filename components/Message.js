import ReactDom from 'react-dom';
import { lifecycle } from 'recompose';

const enhance = lifecycle({
  componentDidMount() {
    const myElement = ReactDom.findDOMNode(this);
    myElement.scrollIntoView();
    return null;
  }
});

const Message = ({ message, index, totalCount }) => {
  const distance = totalCount - index - 1;
  let color;
  if(distance > 7){
    color = `black-30`;
  }else{
    color = `black-${100 - distance * 10}`;
  }
  const className = 'tl f2 ' + color;
  return <li className={className}>{message}</li>;
};

export default enhance(Message);
