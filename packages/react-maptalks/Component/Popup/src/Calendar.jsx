import 'antd/es/calendar/style/css';
import Calendar from 'antd/es/calendar';
import React from 'react';

export default function MapCalendar(props) {
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (<Calendar fullscreen={props.fullscreen} onPanelChange={onPanelChange} />)
}
