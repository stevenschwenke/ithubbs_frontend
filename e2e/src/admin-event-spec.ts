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
    const newEventDateInput = element(by.id('newGroupDescription'));
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
    newEventDateInput.sendKeys('11.01.1111');

    newEventSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    const groupID = await extractEventIDForEventWithURI('https://newevent.com');
    expect(element(by.id('ventID_' + groupID)).getText()).not.toBe('');
    expect(element(by.id('eventName_' + groupID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventURL_' + groupID)).getText()).toBe('https://newevent.com');
    expect(element(by.id('eventDescription_' + groupID)).getText()).toBe('11.01.1111');
  });

  it('should allow deletion of existing event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created group exists with old values

    const groupID = await extractEventIDForEventWithURI('https://newevent.com');

    expect(element(by.id('eventName_' + groupID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventURL_' + groupID)).getText()).toBe('https://newevent.com');
    expect(element(by.id('eventDate_' + groupID)).getText()).toBe('11.01.1111');

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
    const existingEventDateInput = element(by.id('existingEventDate'));
    existingEventDateInput.clear();
    existingEventDateInput.sendKeys('11.01.1111');
    const existingEventSubmitButton = element(by.id('existingEventSubmitButton'));
    existingEventSubmitButton.click();

    // overlay dialog is closed

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    expect(element(by.id('eventName_' + groupID)).getText()).toBe('Edited Event\'s Name');
    expect(element(by.id('eventURL_' + groupID)).getText()).toBe('https://newevent_EDITED.com');
    expect(element(by.id('eventDate_' + groupID)).getText()).toBe('11.01.1111');
  });

  it('should allow deleting existing event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created event exists with old values

    expect(element(by.linkText('https://newevent_EDITED.com')).isPresent()).toBeTruthy();
    const groupID = await extractEventIDForEventWithURI('https://newevent_EDITED.com');

    // open confirmation dialog and delete group

    expect(element(by.id('confirmationDialog')).isDisplayed()).toBeFalsy();
    element(by.id('deleteExistingEventButton_' + groupID)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(element(by.linkText('https://newevent_EDITED.com')).isPresent()).toBeFalsy();
  });


  /**
   * Extracts the ID of an event with the given URI from the event-table.
   *
   * @param uri of event
   * @return ID of event
   */
  async function extractEventIDForEventWithURI(uri: string) {
    const tableDataWithURI = element.all(by.css('.grouptable tr td')).filter(function (elem, index) {
      return elem.getText().then(function (text) {
        return text === uri;
      });
    }).first();
    const tableRow = tableDataWithURI.element(by.xpath('..'));
    return await tableRow.element(by.css('.eventtableidcolumn')).getText();
  }
});
