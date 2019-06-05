import {AppPage} from './app.po';
import {browser, by, element, protractor} from 'protractor';

describe('Admin/event area', () => {
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

  it('should allow creation of new event', async function () {

    browser.get('http://localhost:4200/admin/events');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');

    // group to be created doesn't exist yet

    expect(element(by.linkText('https://newevent.com')).isPresent()).toBeFalsy();

    // overlay dialog for creating new group is closed

    const newEventNameInput = element(by.id('newEventName'));
    expect(newEventNameInput.isPresent()).toBeFalsy();
    const newEventURLInput = element(by.id('newEventURL'));
    expect(newEventURLInput.isPresent()).toBeFalsy();
    const newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    expect(newEventDateInput.isPresent()).toBeFalsy();
    const newEventSubmitButton = element(by.id('newEventSubmitButton'));
    expect(newEventSubmitButton.isPresent()).toBeFalsy();

    // open overlay dialog to create new group
    element(by.id('createNewEventButton')).click();

    expect(newEventNameInput.isPresent()).toBeTruthy();
    expect(newEventURLInput.isPresent()).toBeTruthy();
    expect(newEventDateInput.isPresent()).toBeTruthy();
    expect(newEventSubmitButton.isPresent()).toBeTruthy();

    newEventNameInput.sendKeys('New Event\'s Name');
    newEventURLInput.sendKeys('https://newevent.com');
    newEventDateInput.sendKeys('06/03/2019 11:55');

    element(by.id('newEventHeader')).click();   // to deselect date chooser and close popup
    browser.sleep(1000);
    newEventSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    const groupID = await extractEventIDForTableRowWithContent('New Event\'s Name');
    expect(element(by.id('eventID_' + groupID)).getText()).not.toBe('');
    expect(element(by.id('eventURL_' + groupID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + groupID)).getText()).toBe('Montag, 03.06.2019 11:55');
  });

  it('should allow editing of existing event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created group exists with old values

    const groupID = await extractEventIDForTableRowWithContent('New Event\'s Name');

    expect(element(by.id('eventURL_' + groupID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + groupID)).getText()).toBe('Montag, 03.06.2019 11:55');

    // open overlay dialog

    element(by.id('editExistingEventButton_' + groupID)).click();

    // change values

    browser.waitForAngular();

    const existingEventNameInput = element(by.id('existingEventName'));
    existingEventNameInput.clear();
    existingEventNameInput.sendKeys('Edited Event\'s Name');
    const existingEventURLInput = element(by.id('existingEventURL'));
    existingEventURLInput.clear();
    existingEventURLInput.sendKeys('https://newevent_EDITED.com');

    // editing date omitted because was not able to test this

    const existingEventSubmitButton = element(by.id('existingEventSubmitButton'));
    existingEventSubmitButton.click();

    // overlay dialog is closed

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    expect(element(by.id('eventURL_' + groupID)).getText()).toBe('Edited Event\'s Name');
    // expect(element(by.id('eventDate_' + groupID)).getText()).toBe('Monday, 03.06.2019 11:59');
  });

  it('should allow deleting existing event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created event exists with old values

    const groupID = await extractEventIDForTableRowWithContent('Edited Event\'s Name');

    // open confirmation dialog and delete group

    expect(element(by.id('confirmationDialog')).isDisplayed()).toBeFalsy();
    element(by.id('deleteExistingEventButton_' + groupID)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(element(by.linkText('Edited Event\'s Name')).isPresent()).toBeFalsy();
  });

  it('should clear form for adding new event after usage', async function () {

    browser.get('http://localhost:4200/admin/events');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');

    // group to be created doesn't exist yet

    expect(element(by.linkText('https://newevent.com')).isPresent()).toBeFalsy();

    // overlay dialog for creating new group is closed

    let newEventNameInput = element(by.id('newEventName'));
    expect(newEventNameInput.isPresent()).toBeFalsy();
    let newEventURLInput = element(by.id('newEventURL'));
    expect(newEventURLInput.isPresent()).toBeFalsy();
    let newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    expect(newEventDateInput.isPresent()).toBeFalsy();
    const newEventSubmitButton = element(by.id('newEventSubmitButton'));
    expect(newEventSubmitButton.isPresent()).toBeFalsy();

    // open overlay dialog to create new group
    element(by.id('createNewEventButton')).click();

    expect(newEventNameInput.isPresent()).toBeTruthy();
    expect(newEventURLInput.isPresent()).toBeTruthy();
    expect(newEventDateInput.isPresent()).toBeTruthy();
    expect(newEventSubmitButton.isPresent()).toBeTruthy();

    newEventNameInput.sendKeys('New Event\'s Name');
    newEventURLInput.sendKeys('https://newevent.com');
    newEventDateInput.sendKeys('06/03/2019 11:55');

    element(by.id('newEventHeader')).click();   // to deselect date chooser and close popup
    browser.sleep(1000);
    newEventSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // open dialog again and check if input fields are empty

    element(by.id('createNewEventButton')).click();
    browser.sleep(2000);
    newEventNameInput = element(by.id('newEventName'));
    newEventURLInput = element(by.id('newEventURL'));
    newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    expect(newEventNameInput.getAttribute('value')).toEqual('');
    expect(newEventURLInput.getAttribute('value')).toEqual('');
    expect(newEventDateInput.getAttribute('value')).toEqual('');
  });

  /**
   * @param content of event
   * @return ID of event
   */
  async function extractEventIDForTableRowWithContent(content: string) {
    const tableDataWithURI = element.all(by.css('.grouptable tr td')).filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === content;
      });
    }).first();
    const tableRow = tableDataWithURI.element(by.xpath('..'));
    return await tableRow.element(by.css('.eventtableidcolumn')).getText();
  }
});
