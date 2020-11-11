import { sum } from '../src/utils/utils';

/**
 * e2e测试
 * https://github.com/puppeteer/puppeteer
 */
const puppeteer = require('puppeteer');
const RouterConfig = require('../config/config').default.routes;
const BASE_URL = `http://salary-dev.zh1998.com:8038`;
let page:any = null;
let browser:any = null;

function formatter(routes) {
  let result = [];
  routes.forEach((item) => {
    if (item.path) {
      result.push(item.path);
    }
    if (item.routes) {
      result = result.concat(
        formatter(item.routes),
      );
    }
  });
  return result;
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({width:1920, height:1080});
  await page.setJavaScriptEnabled(true);
});

describe('e2e页面测试', () => {
  const testPage = (path) => async () => {
    await page.goto(`${BASE_URL}${path}`,{
      waitUntil: 'networkidle2'
    });

    await wait(3000);

    await page.screenshot({path: `./test/images${path}.png`});

    // expect(haveFooter).toBeTruthy();
  };

  // const routers = formatter(RouterConfig);
  // routers.forEach((route) => {
  // it(`测试页面 pages`, testPage(route));
  // });

  it(`测试页面 pages`, testPage('/signIn'));
});

afterEach(async () => {
  await browser.close();
});
