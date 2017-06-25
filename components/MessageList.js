import Message from './Message';

const MessageList = props => {
  const totalCount = props.messages.length;

  return (
    <div id="MessageList" className="w-100 h-100">
      <ul className="list pa2 bg-black-05 vh-75">
        {props.messages.map(({ id, text }, index) => {
          return <Message key={id} message={text} index={index} totalCount={totalCount}/>;
        })}
      </ul>

      {/*<style jsx>{`*/}
        {/*#MessageList {*/}
          {/*height: 500px;*/}
          {/*width: 100%;*/}
          {/*display: flex;*/}
          {/*justify-content: center;*/}
          {/*align-items: center;*/}
        {/*}*/}
        {/*#MessageList ul {*/}
          {/*border: 1px dotted blue;*/}
          {/*height: inherit;*/}
          {/*width: 80%;*/}
          {/*overflow: scroll;*/}
        {/*}*/}
      {/*`}</style>*/}
    </div>
  );
};

export default MessageList;
