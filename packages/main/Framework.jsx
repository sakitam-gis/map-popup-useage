import 'antd/es/spin/style/css';
import 'antd/es/icon/style/css';
import React, {
  useState,
} from 'react';
import Icon from 'antd/es/icon';
import Spin from 'antd/es/spin';
import style from './index.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default function Framework(props) {

  const { content, loading } = props;

  const [className, setClassName] = useState('react');

  function goto(id, title, href) {
    setClassName(id);
    window.history.pushState({}, title, href);
  }

  function setInterval() {
    window.setInterval(() => {
      console.log('master interval');
    }, 1000);
  }

  return (
    <>
      <header className={style.header}>
        <div className={style.bg} />
        <div className={style.links}>
          <a className={`${style.linkA} ${className === 'react' ? style.active : ''}`} onClick={() => goto('react', 'react app', '/react')}>ReactMap</a>
          <a className={`${style.linkA} ${className === 'vue' ? style.active : ''}`} onClick={() => goto('vue', 'vue app', '/vue')}>VueMap</a>
        </div>
      </header>
      {loading ? <Spin indicator={antIcon} /> : null}
      <div dangerouslySetInnerHTML={{ __html: content }} className={style.appContainer}/>
    </>
  );
}
