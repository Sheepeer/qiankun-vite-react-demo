// import 'zone.js'; // for angular subapp
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import './index.less';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from './render/ReactRender';
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'dns-saas-web',
      // entry: 'https://test.fake.dns.qihoo.net:3000',  // develop
      entry: 'https://test.fake.dns.qihoo.net:4173',  // build
      container: '#subapp-viewport',
      loader,
      activeRule: '/dns'
    },
    // {
    //   name: 'vite-project',
    //   entry: 'http://127.0.0.1:5173',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/vite-project'
    // }
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp('/vue3');
// setDefaultMountApp('/dns')

/**
 * Step4 启动应用
 */
start({
  // sandbox: { strictStyleIsolation: true }
});

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
