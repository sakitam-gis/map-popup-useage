import 'antd/es/calendar/style/css';
import Calendar from 'antd/es/calendar';
import React from 'react';
import { connect } from 'react-redux';
// import { actionTime } from '../../../redux/actions';

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.time
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onPanelChange: (time) => dispatch({
      type: 'ACTION_UPDATE_TIME',
      payload: {
        time,
      },
    })
  }
}

function MapCalendar(props) {
  function onPanelChange(value, mode) {
    console.log(value, mode);
    if (props.onPanelChange) {
      props.onPanelChange(value.format('YYYY-MM-DD'));
    }
  }

  return (<Calendar fullscreen={props.fullscreen} onPanelChange={onPanelChange} />)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapCalendar);

// export default MapCalendar;
