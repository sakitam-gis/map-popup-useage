import 'antd/es/spin/style/css';
import 'antd/es/icon/style/css';
import React from 'react';
import Icon from 'antd/es/icon';
import Spin from 'antd/es/spin';
import style from './index.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default function Framework(props) {

  const { content, loading } = props;

  function goto(title, href) {
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
        <nav>
          <ol>
            <li><a onClick={() => goto('react app', '/react')}>react16 + antd3</a></li>
            <li><a onClick={() => goto('vue app', '/vue')}>vue2 + element2</a></li>
          </ol>
        </nav>
      </header>
      {loading ? <Spin indicator={antIcon} /> : null}
      <div dangerouslySetInnerHTML={{ __html: content }} className={style.appContainer}/>
    </>
  );
}
