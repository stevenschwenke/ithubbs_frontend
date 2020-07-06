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

  xit('should allow creation of new event', async function () {

    browser.get('http://localhost:4200/admin/events');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');

    // event to be created doesn't exist yet

    expect(element(by.linkText('https://newevent.com')).isPresent()).toBeFalsy();

    // overlay dialog for creating new event is closed

    const newEventNameInput = element(by.id('newEventName'));
    expect(newEventNameInput.isPresent()).toBeFalsy();
    const newEventURLInput = element(by.id('newEventURL'));
    expect(newEventURLInput.isPresent()).toBeFalsy();
    const newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    expect(newEventDateInput.isPresent()).toBeFalsy();
    const newEventSubmitButton = element(by.id('newEventSubmitButton'));
    expect(newEventSubmitButton.isPresent()).toBeFalsy();

    // open overlay dialog to create new event
    element(by.id('createNewEventButton')).click();

    expect(newEventNameInput.isPresent()).toBeTruthy();
    expect(newEventURLInput.isPresent()).toBeTruthy();
    expect(newEventDateInput.isPresent()).toBeTruthy();
    expect(newEventSubmitButton.isPresent()).toBeTruthy();

    newEventNameInput.sendKeys('New Event\'s Name');
    newEventURLInput.sendKeys('https://newevent.com');
    newEventDateInput.sendKeys('06/03/2019 11:55');
    // (don't choose a group for this event!)

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

    const eventID = await extractEventIDForTableRowWithContent('New Event\'s Name');
    expect(element(by.id('eventID_' + eventID)).getText()).not.toBe('');
    expect(element(by.id('eventGroup_' + eventID)).getText()).toBe('');
    expect(element(by.id('eventURL_' + eventID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + eventID)).getText()).toBe('Montag, 03.06.2019 11:55');
  });

  xit('should allow editing of existing event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created event exists with old values

    const eventID = await extractEventIDForTableRowWithContent('New Event\'s Name');

    expect(element(by.id('eventURL_' + eventID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + eventID)).getText()).toBe('Montag, 03.06.2019 11:55');

    // open overlay dialog

    element(by.id('editExistingEventButton_' + eventID)).click();

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

    expect(element(by.id('eventURL_' + eventID)).getText()).toBe('Edited Event\'s Name');
  });

  xit('should allow deleting existing event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created event exists with old values

    const eventID = await extractEventIDForTableRowWithContent('Edited Event\'s Name');

    // open confirmation dialog and delete group

    expect(element(by.id('confirmationDialog')).isDisplayed()).toBeFalsy();
    element(by.id('deleteExistingEventButton_' + eventID)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(element(by.linkText('Edited Event\'s Name')).isPresent()).toBeFalsy();
  });

  xit('should clear form for adding new event after usage', async function () {

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

  xit('should allow setting and unsetting flag for public event', async () => {

    browser.get('http://localhost:4200/admin/events');

    // formerly created event exists with old values

    const eventID = await extractEventIDForTableRowWithContent('New Event\'s Name');

    expect(element(by.id('eventGeneralPublic_' + eventID)).isPresent()).toBeFalsy();

    // open overlay dialog and check general public true

    element(by.id('editExistingEventButton_' + eventID)).click();
    browser.waitForAngular();

    let existingEventGeneralPublicCheckbox = element(by.id('existingEventGeneralPublic'));
    existingEventGeneralPublicCheckbox.click();

    let existingEventSubmitButton = element(by.id('existingEventSubmitButton'));
    existingEventSubmitButton.click();

    // (overlay dialog is closed)

    browser.waitForAngular();

    expect(element(by.id('existingEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('existingEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('existingEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('existingEventSubmitButton')).isPresent()).toBeFalsy();
    expect(element(by.id('existingEventGeneralPublic')).isPresent()).toBeFalsy();

    expect(element(by.id('eventGeneralPublic_' + eventID)).isPresent()).toBeTruthy();

    // reopen overlay dialog and check general public false

    element(by.id('editExistingEventButton_' + eventID)).click();
    browser.waitForAngular();

    existingEventGeneralPublicCheckbox = element(by.id('existingEventGeneralPublic'));
    existingEventGeneralPublicCheckbox.click();

    existingEventSubmitButton = element(by.id('existingEventSubmitButton'));
    existingEventSubmitButton.click();

    expect(element(by.id('eventGeneralPublic_' + eventID)).isPresent()).toBeFalsy();
  });

  xit('should allow linking events and groups', async function () {

    ////////////////////////
    // Create two groups
    ////////////////////////

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

    // open overlay dialog to create new group 1

    element(by.id('createNewGroupButton')).click();

    expect(newGroupNameInput.isPresent()).toBeTruthy();
    expect(newGroupURLInput.isPresent()).toBeTruthy();
    expect(newGroupDescriptionInput.isPresent()).toBeTruthy();
    expect(newGroupSubmitButton.isPresent()).toBeTruthy();

    newGroupNameInput.sendKeys('Group 1');
    newGroupURLInput.sendKeys('https://group1.com');
    newGroupDescriptionInput.sendKeys('Group 1 Description');

    newGroupSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    // open overlay dialog to create new group 2

    element(by.id('createNewGroupButton')).click();

    expect(newGroupNameInput.isPresent()).toBeTruthy();
    expect(newGroupURLInput.isPresent()).toBeTruthy();
    expect(newGroupDescriptionInput.isPresent()).toBeTruthy();
    expect(newGroupSubmitButton.isPresent()).toBeTruthy();

    newGroupNameInput.sendKeys('Group 2');
    newGroupURLInput.sendKeys('https://group2.com');
    newGroupDescriptionInput.sendKeys('Group 2 Description');

    newGroupSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newGroupName')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newGroupSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    const group1ID = await extractGroupIDForTableRowWithContent('https://group1.com');
    expect(element(by.id('groupID_' + group1ID)).getText()).not.toBe('');
    expect(element(by.id('groupName_' + group1ID)).getText()).toBe('Group 1');
    expect(element(by.id('groupURL_' + group1ID)).getText()).toBe('https://group1.com');
    expect(element(by.id('groupDescription_' + group1ID)).getText()).toBe('Group 1 Description');

    const group2ID = await extractGroupIDForTableRowWithContent('https://group2.com');
    expect(element(by.id('groupID_' + group2ID)).getText()).not.toBe('');
    expect(element(by.id('groupName_' + group2ID)).getText()).toBe('Group 2');
    expect(element(by.id('groupURL_' + group2ID)).getText()).toBe('https://group2.com');
    expect(element(by.id('groupDescription_' + group2ID)).getText()).toBe('Group 2 Description');


    ////////////////////////
    // Create Event with first one of existing two groups
    ////////////////////////

    browser.get('http://localhost:4200/admin/events');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');

    // event to be created doesn't exist yet

    expect(element(by.linkText('https://newevent.com')).isPresent()).toBeFalsy();

    // overlay dialog for creating new event is closed

    const newEventNameInput = element(by.id('newEventName'));
    expect(newEventNameInput.isPresent()).toBeFalsy();
    const newEventURLInput = element(by.id('newEventURL'));
    expect(newEventURLInput.isPresent()).toBeFalsy();
    const newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    expect(newEventDateInput.isPresent()).toBeFalsy();
    const newEventSubmitButton = element(by.id('newEventSubmitButton'));
    expect(newEventSubmitButton.isPresent()).toBeFalsy();

    // open overlay dialog to create new event
    element(by.id('createNewEventButton')).click();

    expect(newEventNameInput.isPresent()).toBeTruthy();
    expect(newEventURLInput.isPresent()).toBeTruthy();
    expect(newEventDateInput.isPresent()).toBeTruthy();
    expect(newEventSubmitButton.isPresent()).toBeTruthy();

    newEventNameInput.sendKeys('New Event\'s Name');
    newEventDateInput.sendKeys('06/03/2019 11:55');
    element(by.id('newEventHeader')).click();   // to deselect date chooser and close popup
    newEventURLInput.sendKeys('https://newevent.com');
    selectInAutocomplete('newEventGroup', 'Group 1', 1);
    element(by.id('newEventHeader')).click();   // to close autocomplete-popup
    newEventSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    const eventID = await extractEventIDForTableRowWithContent('New Event\'s Name');
    expect(element(by.id('eventID_' + eventID)).getText()).not.toBe('');
    expect(element(by.id('eventGroup_' + eventID)).getText()).toBe('Group 1');
    expect(element(by.id('eventURL_' + eventID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + eventID)).getText()).toBe('Montag, 03.06.2019 11:55');

    ////////////////////////
    // Edit existing event with other one of existing two groups
    ////////////////////////

    element(by.id('editExistingEventButton_' + eventID)).click();

    browser.waitForAngular();

    selectInAutocomplete('existingEventGroup', 'Group 2', 1);
    element(by.id('existingEventName')).click(); // to deselect open popup
    const existingEventSubmitButton = element(by.id('existingEventSubmitButton'));
    existingEventSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    expect(element(by.id('eventID_' + eventID)).getText()).not.toBe('');
    expect(element(by.id('eventGroup_' + eventID)).getText()).toBe('Group 2');
    expect(element(by.id('eventURL_' + eventID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + eventID)).getText()).toBe('Montag, 03.06.2019 11:55');

    ////////////////////////
    // Edit existing event to have no group
    ////////////////////////

    element(by.id('editExistingEventButton_' + eventID)).click();

    browser.waitForAngular();

    selectInAutocomplete('existingEventGroup', 'keine', 1);
    element(by.id('existingEventName')).click(); // to deselect open popup
    existingEventSubmitButton.click();

    // overlay dialog for creation is closed again

    browser.waitForAngular();

    expect(element(by.id('newEventName')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventURL')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventDescription')).isPresent()).toBeFalsy();
    expect(element(by.id('newEventSubmitButton')).isPresent()).toBeFalsy();

    // all values are present in table

    expect(element(by.id('eventID_' + eventID)).getText()).not.toBe('');
    expect(element(by.id('eventGroup_' + eventID)).getText()).toBe('');
    expect(element(by.id('eventURL_' + eventID)).getText()).toBe('New Event\'s Name');
    expect(element(by.id('eventDate_' + eventID)).getText()).toBe('Montag, 03.06.2019 11:55');


    ////////////////////////
    // Cleanup: Delete event and groups
    ////////////////////////

    element(by.id('deleteExistingEventButton_' + eventID)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.sleep(500);

    browser.get('http://localhost:4200/admin/groups');
    expect(element(by.linkText('https://group1.com')).isPresent()).toBeTruthy();
    const groupID1 = await extractGroupIDForTableRowWithContent('https://group1.com');
    element(by.id('deleteExistingGroupButton_' + groupID1)).click();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(element(by.linkText('https://group1.com')).isPresent()).toBeFalsy();
    expect(element(by.linkText('https://group2.com')).isPresent()).toBeTruthy();
    const groupID2 = await extractGroupIDForTableRowWithContent('https://group2.com');
    element(by.id('deleteExistingGroupButton_' + groupID2)).click();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(element(by.linkText('https://group2.com')).isPresent()).toBeFalsy();
  }, 120000);

  it('should show only events set by the year-filter in both admin-view and public view', async () => {

    ////////////////////////
    // Create two events in different years
    ////////////////////////

    browser.get('http://localhost:4200/admin/events');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/admin/events');

    // open overlay dialog to create new event
    element(by.id('createNewEventButton')).click();

    let newEventNameInput = element(by.id('newEventName'));
    let newEventURLInput = element(by.id('newEventURL'));
    let newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    let newEventSubmitButton = element(by.id('newEventSubmitButton'));

    newEventNameInput.sendKeys('Event 2019');
    newEventDateInput.sendKeys('06/03/2019 11:55');
    element(by.id('newEventHeader')).click();   // to deselect date chooser and close popup
    newEventURLInput.sendKeys('https://event2019.com');
    newEventSubmitButton.click();
    browser.waitForAngular();

    element(by.id('createNewEventButton')).click();

    newEventNameInput = element(by.id('newEventName'));
    newEventURLInput = element(by.id('newEventURL'));
    newEventDateInput = element(by.id('newEventDate')).element(by.tagName('span')).element(by.tagName('input'));
    newEventSubmitButton = element(by.id('newEventSubmitButton'));

    newEventNameInput.sendKeys('Event 2050');
    newEventDateInput.sendKeys('06/03/2050 11:55');
    element(by.id('newEventHeader')).click();   // to deselect date chooser and close popup
    newEventURLInput.sendKeys('https://event2050.com');
    newEventSubmitButton.click();
    browser.waitForAngular();

    // Refresh page to show filter-buttons
    browser.get('http://localhost:4200/admin/events');

    ////////////////////////
    // Test year-filter in admin-event-view
    ////////////////////////

    // Both events show in admin-table without any filters

    const eventID2019 = await extractEventIDForTableRowWithContent('Event 2019');
    expect(element(by.id('eventID_' + eventID2019)).getText()).not.toBe('');
    expect(element(by.id('eventURL_' + eventID2019)).getText()).toBe('Event 2019');
    expect(element(by.id('eventDate_' + eventID2019)).getText()).toBe('Montag, 03.06.2019 11:55');

    const eventID2050 = await extractEventIDForTableRowWithContent('Event 2050');
    expect(element(by.id('eventID_' + eventID2050)).getText()).not.toBe('');
    expect(element(by.id('eventURL_' + eventID2050)).getText()).toBe('Event 2050');
    expect(element(by.id('eventDate_' + eventID2050)).getText()).toBe('Freitag, 03.06.2050 11:55');

    // Only 2019 event shows in admin-table with 2019 filter

    let yearFilterButton2019 = element(by.id('yearFilter_2019'));
    expect(yearFilterButton2019).toBeTruthy();

    yearFilterButton2019.click();

    expect(element(by.id('eventDate_' + eventID2019)).getText()).toBe('Montag, 03.06.2019 11:55');
    expect(element(by.id('eventDate_' + eventID2050)).isPresent()).toBeFalsy();

    // Only 2050 event shows in admin-table with 2050 filter

    let yearFilterButton2050 = element(by.id('yearFilter_2050'));
    expect(yearFilterButton2050).toBeTruthy();

    yearFilterButton2050.click();

    expect(element(by.id('eventDate_' + eventID2019)).isPresent()).toBeFalsy();
    expect(element(by.id('eventDate_' + eventID2050)).getText()).toBe('Freitag, 03.06.2050 11:55');

    // Future event shows in admin-table with future-filter

    let yearFilterButtonFuture = element(by.id('yearFilterFuture'));
    expect(yearFilterButtonFuture).toBeTruthy();

    yearFilterButtonFuture.click();

    expect(element(by.id('eventDate_' + eventID2019)).isPresent()).toBeFalsy();
    expect(element(by.id('eventDate_' + eventID2050)).getText()).toBe('Freitag, 03.06.2050 11:55');


    ////////////////////////
    // Test year-filter in public event-view
    ////////////////////////

    browser.get('http://localhost:4200/current');

    // Only future event shows in table without any filters

    expect(element(by.id('eventDate_' + eventID2019)).isPresent()).toBeFalsy();
    expect(element(by.id('eventDate_' + eventID2050)).getText()).toBe('Freitag, 03.06.2050 11:55');

    // Only 2019 event shows in table with 2019 filter

    yearFilterButton2019 = element(by.id('yearFilter_2019'));
    expect(yearFilterButton2019).toBeTruthy();

    yearFilterButton2019.click();
    browser.waitForAngular();

    expect(element(by.id('eventDate_' + eventID2019)).getText()).toBe('Montag, 03.06.2019 11:55');
    expect(element(by.id('eventDate_' + eventID2050)).isPresent()).toBeFalsy();

    // Only 2050 event shows in table with 2050 filter

    yearFilterButton2050 = element(by.id('yearFilter_2050'));
    expect(yearFilterButton2050).toBeTruthy();

    yearFilterButton2050.click();

    expect(element(by.id('eventDate_' + eventID2019)).isPresent()).toBeFalsy();
    expect(element(by.id('eventDate_' + eventID2050)).getText()).toBe('Freitag, 03.06.2050 11:55');

    // Only future event shows in table with future-filter

    yearFilterButtonFuture = element(by.id('yearFilterFuture'));
    expect(yearFilterButtonFuture).toBeTruthy();

    yearFilterButtonFuture.click();

    expect(element(by.id('eventDate_' + eventID2019)).isPresent()).toBeFalsy();
    expect(element(by.id('eventDate_' + eventID2050)).getText()).toBe('Freitag, 03.06.2050 11:55');

    ////////////////////////
    // Cleanup: Delete events
    ////////////////////////

    browser.get('http://localhost:4200/admin/events');

    element(by.id('deleteExistingEventButton_' + eventID2019)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.sleep(500);
    element(by.id('deleteExistingEventButton_' + eventID2050)).click();
    expect(element(by.id('confirmationDialog')).isPresent()).toBeTruthy();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.sleep(500);
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

  function selectInAutocomplete(idOfAutocomplete: string, textToTypeBeforeSelecting: string, indexOfItemAfterTyping: number) {

    const newEventGroupInput = element(by.id(idOfAutocomplete)).element(by.tagName('span')).element(by.tagName('input'));
    newEventGroupInput.click();
    newEventGroupInput.clear();
    newEventGroupInput.sendKeys(textToTypeBeforeSelecting);
    browser.sleep(500);
    for (let i = 0; i <= indexOfItemAfterTyping; i++) {
      browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    }
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

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
