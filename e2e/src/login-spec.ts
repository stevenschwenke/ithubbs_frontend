import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().maximize();
  });

  it('should forward to /admin/login when accessing admin/groups without prior login', function () {

    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/groups');

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/login');
  });

  it('should forward to /admin/login when accessing admin/events without prior login', function () {

    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/events');

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/login');
  });

  it('should not login with the wrong credentials', function () {

    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/login');

    element(by.id('username')).sendKeys('wrongusername');
    element(by.id('password')).sendKeys('wrongpassword');
    const loginButton = element(by.id('loginbutton'));
    expect(loginButton.isPresent()).toBeTruthy();

    loginButton.click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/login');
  });

  it('should login with the right credentials', function () {

    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/login');

    element(by.id('username')).sendKeys('steven');
    element(by.id('password')).sendKeys('steven');
    const loginButton = element(by.id('loginbutton'));
    expect(loginButton.isPresent()).toBeTruthy();

    loginButton.click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');
  });

  it('should logout properly', function () {

    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/login');

    element(by.id('username')).sendKeys('steven');
    element(by.id('password')).sendKeys('steven');
    const loginButton = element(by.id('loginbutton'));

    loginButton.click();

    element(by.id('logoutbutton')).click();

    browser.get('http://localhost:4200/admin/groups');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/login');
  });
});
