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
    element(by.id('loginbutton')).click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');
  });

  it('should allow creation of new group', function () {

    browser.get('http://localhost:4200/admin/groups');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/groups');

    // group to be created doesn't exist yet

    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeFalsy();

    // overlay-panel for creating new group is closed

    const newGroupNameInput = element(by.id('newGroupName'));
    expect(newGroupNameInput.isPresent()).toBeFalsy();
    const newGroupURLInput = element(by.id('newGroupURL'));
    expect(newGroupURLInput.isPresent()).toBeFalsy();
    const newGroupDescriptionInput = element(by.id('newGroupDescription'));
    expect(newGroupDescriptionInput.isPresent()).toBeFalsy();
    const newGroupSubmitButton = element(by.id('newGroupSubmitButton'));
    expect(newGroupSubmitButton.isPresent()).toBeFalsy();

    // open overlay-panel to create new group

    element(by.id('createNewGroupButton')).click();

    expect(newGroupNameInput.isPresent()).toBeTruthy();
    expect(newGroupURLInput.isPresent()).toBeTruthy();
    expect(newGroupDescriptionInput.isPresent()).toBeTruthy();
    expect(newGroupSubmitButton.isPresent()).toBeTruthy();

    newGroupNameInput.sendKeys('New Group\'s Name');
    newGroupURLInput.sendKeys('https://newgroup.com');
    newGroupDescriptionInput.sendKeys('New Group\'s Description');

    newGroupSubmitButton.click();

    // overlay-panel for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table
    // TODO
    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeTruthy();
  });

  it('should allow editing of existing group', async ()  => {

    browser.get('http://localhost:4200/admin/groups');
    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeTruthy(); // (created in former test)

    // open overlay-panel

    const tableDataWithURI = element.all(by.css('.grouptable tr td')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === 'https://newgroup.com';
      });
    }).first();
    const tableRow = tableDataWithURI.element(by.xpath('..'));
    const groupID = await tableRow.element(by.css('.grouptableidcolumn')).getText();
// TODO Das "await" in Verbindung mit dem "async" oben hat bewirkt, dass auf Promisses gewartet wird und man sie nicht mehr selbst mit then() abholen muss
    element(by.id('editExistingGroupButton_' + groupID)).click();

    // change values

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

    // overlay-panel is closed

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    expect(element(by.id('groupName_' + groupID)).getText()).toBe('Edited Group\'s Name');
    expect(element(by.id('groupURL_' + groupID)).getText()).toBe('https://newgroup_EDITED.com');
    expect(element(by.id('groupDescription_' + groupID)).getText()).toBe('Edited Group\'s Description');
  });
});
