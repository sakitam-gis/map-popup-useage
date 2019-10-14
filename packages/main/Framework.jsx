import 'antd/es/spin/style/css';
import 'antd/es/icon/style/css';
import React, {
  useState,
} from 'react';
import Icon from 'antd/es/icon';
import Spin from 'antd/es/spin';
import style from './index.less';
import { replaceHash } from './utils';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default function Framework(props) {

  const { content, loading, mode } = props;

  const [className, setClassName] = useState('react');

  function goto(id, title, href) {
    setClassName(id);

    if (mode === 'history') {
      window.history.pushState({}, title, href);
    }

    if (mode === 'hash') {
      replaceHash(href);
    }
  }

  function setInterval() {
    window.setInterval(() => {
      console.log('master interval');
    }, 1000);
  }

  const baseUrl = '';

  return (
    <>
      <header className={style.header}>
        <div className={style.bg} />
        <div className={style.links}>
          <a className={`${style.linkA} ${className === 'react' ? style.active : ''}`} onClick={() => goto('react', 'react app', `${baseUrl}/react`)}>ReactMap</a>
          <a className={`${style.linkA} ${className === 'vue' ? style.active : ''}`} onClick={() => goto('vue', 'vue app', `${baseUrl}/vue`)}>VueMap</a>
        </div>
      </header>
      {loading ? <Spin indicator={antIcon} /> : null}
      <div dangerouslySetInnerHTML={{ __html: content }} className={style.appContainer}/>
    </>
  );
}
