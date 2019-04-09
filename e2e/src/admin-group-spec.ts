import {AppPage} from './app.po';
import {$$, browser, by, element} from 'protractor';

describe('Admin/group area', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    browser.driver.manage().window().maximize();

    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/login');

    element(by.id('username')).sendKeys('steven');
    element(by.id('password')).sendKeys('steven');
    const loginButton = element(by.id('loginbutton'));
    loginButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');
  });

  afterEach(() => {
    browser.waitForAngularEnabled(true);
    browser.get('http://localhost:4200/admin/groups');
    element(by.id('logoutbutton')).click();
  });

  it('should allow creation of new group', function () {

    browser.get('http://localhost:4200/admin/groups');

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/groups');

    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeFalsy();

    const newGroupNameInput = element(by.id('newGroupName'));
    expect(newGroupNameInput.isPresent()).toBeFalsy();
    const newGroupURLInput = element(by.id('newGroupURL'));
    expect(newGroupURLInput.isPresent()).toBeFalsy();
    const newGroupDescriptionInput = element(by.id('newGroupDescription'));
    expect(newGroupDescriptionInput.isPresent()).toBeFalsy();
    const newGroupSubmitButton = element(by.id('newGroupSubmitButton'));
    expect(newGroupSubmitButton.isPresent()).toBeFalsy();

    element(by.id('createNewGroupButton')).click();

    expect(newGroupNameInput.isPresent()).toBeTruthy();
    expect(newGroupURLInput.isPresent()).toBeTruthy();
    expect(newGroupDescriptionInput.isPresent()).toBeTruthy();
    expect(newGroupSubmitButton.isPresent()).toBeTruthy();

    newGroupNameInput.sendKeys('New Group\'s Name');
    newGroupURLInput.sendKeys('https://newgroup.com');
    newGroupDescriptionInput.sendKeys('New Group\'s Description');

    newGroupSubmitButton.click();

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeTruthy();
  });

  it('should allow editing of existing group', function () {

    browser.get('http://localhost:4200/admin/groups');
    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeTruthy(); // (created in former test)

    // Open edit-overlay:

    const tableDataWithURI = element.all(by.css('.grouptable tr td')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === 'https://newgroup.com';
      });
    }).first();
    const tableRow = tableDataWithURI.element(by.xpath('..'));
    const idField = tableRow.element(by.css('.grouptableidcolumn'));
    idField.getText().then( function(id) {
      console.log('id of group to edit = ' + id);
      element(by.id('editExistingGroupButton_' + id)).click();
    } );

    // Change values:
    browser.waitForAngular();

    const existingGroupNameInput = element(by.id('existingGroupName'));
    expect(existingGroupNameInput.isPresent()).toBeTruthy();
    const existingGroupURLInput = element(by.id('existingGroupURL'));
    expect(existingGroupURLInput.isPresent()).toBeTruthy();
    const existingGroupDescriptionInput = element(by.id('existingGroupDescription'));
    expect(existingGroupDescriptionInput.isPresent()).toBeTruthy();
    const existingGroupSubmitButton = element(by.id('existingGroupSubmitButton'));
    expect(existingGroupSubmitButton.isPresent()).toBeTruthy();

    existingGroupNameInput.clear();
    existingGroupNameInput.sendKeys('Edited Group\'s Name');
    existingGroupURLInput.clear();
    existingGroupURLInput.sendKeys('https://newgroup_EDITED.com');
    existingGroupDescriptionInput.clear();
    existingGroupDescriptionInput.sendKeys('Edited Group\'s Description');

    existingGroupSubmitButton.click();

    // Make sure edit-overlay closed

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    // TODO Make sure new values are displayed in table
    // TODO copy-paste to test above - it's missing there!
    expect(element(by.linkText('https://newgroup_EDITED.com')).isPresent()).toBeTruthy();


  });
});
