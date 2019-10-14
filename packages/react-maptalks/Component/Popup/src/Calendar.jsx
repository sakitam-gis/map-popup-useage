import 'antd/es/calendar/style/css';
import Calendar from 'antd/es/calendar';
import React, {
  useState,
  useEffect,
} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { actionTime } from '../../../redux/actions';

const FORMAT = 'YYYY-MM-DD';

function mapStateToProps(state) {
  return {
    value: state.timer.time
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelect: (time) => dispatch(actionTime({
      time,
    }))
  }
}

function MapCalendar(props) {
  const { value } = props;

  const [timeValue, setTimeValue] = useState(moment());
  function onSelect(value, mode) {
    if (props.onSelect) {
      props.onSelect(value.format(FORMAT));
    }
  }

  useEffect(() => {
    if (value) {
      setTimeValue(moment(value, FORMAT))
    }

    return () => {
    }
  }, [value]);

  return (<Calendar
    value={timeValue || moment()}
    fullscreen={props.fullscreen}
    onSelect={onSelect}
  />)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapCalendar);

// export default MapCalendar;
