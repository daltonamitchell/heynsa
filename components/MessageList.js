import Message from './Message';

const MessageList = props => {
  return (
    <div id="MessageList">
      <ul>
        {props.messages.map(({ id, text }) => {
          return <Message key={id} message={text} />;
        })}
      </ul>

      <style jsx>{`
        #MessageList {
          height: 500px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #MessageList ul {
          border: 1px dotted blue;
          height: inherit;
          width: 80%;
          overflow: scroll;
        }
      `}</style>
    </div>
  );
};

export default MessageList;
