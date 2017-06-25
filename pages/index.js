import R from 'ramda';
import firebase from 'firebase';
import { withReducer, lifecycle, compose, withHandlers } from 'recompose';

import {
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  START_LISTENING,
  STOP_LISTENING,
  MESSAGE_REMOVED
} from '../store/types';

import Layout from '../components/Layout';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import stylesheet from './index.scss';

const reducer = (model, message) => {
  switch (message.type) {
    case ADD_MESSAGE:
      const { newMessage } = message;
      const newMessages = R.append(newMessage, model.messages);
      return R.merge(model, { messages: newMessages });
      break;
    case UPDATE_MESSAGE:
      const updatedMessage = message.updatedMessage;
      const messageIndex = model.messages.findIndex((elem, index) => {
        return updatedMessage.id === elem.id;
      });

      if (messageIndex > -1) {
        const newMessages = R.update(
          messageIndex,
          updatedMessage,
          model.messages
        );
        return R.merge(model, { messages: newMessages });
      }

      return model;
      break;
    case START_LISTENING:
      return R.merge(model, { listening: true });
      break;
    case STOP_LISTENING:
      return R.merge(model, { listening: false });
      break;
    case MESSAGE_REMOVED:
      return R.merge(model, { messages: [] });
    default:
      return model;
  }
};

const enhance = compose(
  withReducer('model', 'dispatch', reducer, { messages: [], listening: false }),
  withHandlers({
    onStartListening: props => event => {
      props.dispatch({ type: START_LISTENING });
    },
    onStopListening: props => event => {
      props.dispatch({ type: STOP_LISTENING });
    }
  }),
  lifecycle({
    componentDidMount() {
      const config = {
        apiKey: 'AIzaSyDoqc_b_KUNhKjdLCMTxjO1YU6B0ofl7G0',
        authDomain: 'heynsa-f9a93.firebaseapp.com',
        databaseURL: 'https://heynsa-f9a93.firebaseio.com',
        projectId: 'heynsa-f9a93',
        storageBucket: '',
        messagingSenderId: '293884526962'
      };
      const dispatch = this.props.dispatch;

      // Initialize Firebase
      const fbApp = firebase.initializeApp(config);
      const database = fbApp.database();
      const recording = database.ref('recording');
      recording.on('value', snapshot => {
        const messageType = snapshot.val() ? START_LISTENING : STOP_LISTENING;
        dispatch({ type: messageType });
      });

      const discussion = database.ref('discuss');
      discussion.on('child_added', snapshot => {
        dispatch({
          type: ADD_MESSAGE,
          newMessage: {
            text: snapshot.val().transcript,
            id: snapshot.key
          }
        });
      });

      discussion.on('child_removed', snapshot => {
        dispatch({ type: MESSAGE_REMOVED });
      });

      discussion.on('child_changed', snapshot => {
        dispatch({
          type: UPDATE_MESSAGE,
          updatedMessage: {
            text: snapshot.val().transcript,
            id: snapshot.key
          }
        });
      });
    }
  })
);

const Page = ({ model, dispatch, onStartListening, onStopListening }) => {
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <Header
        name="Valley Hackathon"
        start={onStartListening}
        stop={onStopListening}
        listening={model.listening}
      />
      <MessageList messages={model.messages} />
    </Layout>
  );
};

export default enhance(Page);
