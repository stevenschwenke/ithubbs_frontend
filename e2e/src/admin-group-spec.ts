import {AppPage} from './app.po';
import {browser, by, element, protractor} from 'protractor';

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

  it('should allow creation of new group', async function () {

    browser.get('http://localhost:4200/admin/groups');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/groups');

    // group to be created doesn't exist yet

    expect(element(by.linkText('https://newgroup.com')).isPresent()).toBeFalsy();

    // overlay dialog for creating new group is closed

    const newGroupNameInput = element(by.id('newGroupName'));
    expect(newGroupNameInput.isPresent()).toBeFalsy();
    const newGroupURLInput = element(by.id('newGroupURL'));
    expect(newGroupURLInput.isPresent()).toBeFalsy();
    const newGroupDescriptionInput = element(by.id('newGroupDescription'));
    expect(newGroupDescriptionInput.isPresent()).toBeFalsy();
    const newGroupSubmitButton = element(by.id('newGroupSubmitButton'));
    expect(newGroupSubmitButton.isPresent()).toBeFalsy();

    // open overlay dialog to create new group

    element(by.id('createNewGroupButton')).click();

    expect(newGroupNameInput.isPresent()).toBeTruthy();
    expect(newGroupURLInput.isPresent()).toBeTruthy();
    expect(newGroupDescriptionInput.isPresent()).toBeTruthy();
    expect(newGroupSubmitButton.isPresent()).toBeTruthy();

    newGroupNameInput.sendKeys('New Group\'s Name');
    newGroupURLInput.sendKeys('https://newgroup.com');
    newGroupDescriptionInput.sendKeys('New Group\'s Description');

    newGroupSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    const groupID = await extractGroupIDForTableRowWithContent('https://newgroup.com');
    expect(element(by.id('groupID_' + groupID)).getText()).not.toBe('');
    expect(element(by.id('groupName_' + groupID)).getText()).toBe('New Group\'s Name');
    expect(element(by.id('groupURL_' + groupID)).getText()).toBe('https://newgroup.com');
    expect(element(by.id('groupDescription_' + groupID)).getText()).toBe('New Group\'s Description');
  });

  it('should allow editing of existing group', async () => {

    browser.get('http://localhost:4200/admin/groups');

    // formerly created group exists with old values

    const groupID = await extractGroupIDForTableRowWithContent('https://newgroup.com');

    expect(element(by.id('groupName_' + groupID)).getText()).toBe('New Group\'s Name');
    expect(element(by.id('groupURL_' + groupID)).getText()).toBe('https://newgroup.com');
    expect(element(by.id('groupDescription_' + groupID)).getText()).toBe('New Group\'s Description');

    // open overlay dialog

    element(by.id('editExistingGroupButton_' + groupID)).click();

    // change values

    browser.waitForAngular();

    const existingGroupNameInput = element(by.id('existingGroupName'));
    existingGroupNameInput.clear();
    existingGroupNameInput.sendKeys('Edited Group\'s Name');
    const existingGroupURLInput = element(by.id('existingGroupURL'));
    existingGroupURLInput.clear();
    existingGroupURLInput.sendKeys('https://newgroup_EDITED.com');
    const existingGroupDescriptionInput = element(by.id('existingGroupDescription'));
    existingGroupDescriptionInput.clear();
    existingGroupDescriptionInput.sendKeys('Edited Group\'s Description');
    const existingGroupSubmitButton = element(by.id('existingGroupSubmitButton'));
    existingGroupSubmitButton.click();

    // overlay dialog is closed

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

  it('should allow deleting existing group', async () => {

    browser.get('http://localhost:4200/admin/groups');

    // formerly created group exists with old values

    expect(element(by.linkText('https://newgroup_EDITED.com')).isPresent()).toBeTruthy();
    const groupID = await extractGroupIDForTableRowWithContent('https://newgroup_EDITED.com');

    // open confirmation dialog and delete group

    expect(element(by.id('confirmationDialog')).isDisplayed()).toBeFalsy();
    element(by.id('deleteExistingGroupButton_' + groupID)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(element(by.linkText('https://newgroup_EDITED.com')).isPresent()).toBeFalsy();
  });


  /**
   * @param content of group
   * @return ID of group
   */
  async function extractGroupIDForTableRowWithContent(content: string) {
    const tableDataWithURI = element.all(by.css('.grouptable tr td')).filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === content;
      });
    }).first();
    const tableRow = tableDataWithURI.element(by.xpath('..'));
    return await tableRow.element(by.css('.grouptableidcolumn')).getText();
  }
});
