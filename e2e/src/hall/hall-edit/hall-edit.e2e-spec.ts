import { HallEditPage } from './hall-edit.po';
import { browser, logging, element, by, Key } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Hall edit page', () => {
  let page: HallEditPage;

  beforeEach(() => {
    page = new HallEditPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    browser.executeScript("window.localStorage.removeItem('currentuser')");
  });

  it('Should be at /halls/edit/1 route', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo('/login');
    expect(browser.getCurrentUrl()).toContain('/login');

    page.loginEmailInput.sendKeys('email@email.com');
    page.loginPasswordInput.sendKeys('Secret1!');
    expect(page.loginSubmitButton.isEnabled()).toBe(true);

    page.loginSubmitButton.click();

    browser.driver.sleep(500);
    expect(browser.getCurrentUrl()).toContain('/dashboard');

    const getStoredUser = "return window.localStorage.getItem('currentuser');";
    browser.executeScript(getStoredUser).then((user) => {
      expect(user).toBeTruthy();
      expect(user).toContain('email@email.com');
    });

    page.navigateTo('/halls/edit/1');
    expect(browser.getCurrentUrl()).toContain('/halls/edit/1');
    browser.driver.sleep(500);
    expect(page.hallEditSubmitButton.isEnabled()).toBe(true);
  });

  it('Should disable button when name is not valid', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo('/login');
    expect(browser.getCurrentUrl()).toContain('/login');

    page.loginEmailInput.sendKeys('email@email.com');
    page.loginPasswordInput.sendKeys('Secret1!');
    expect(page.loginSubmitButton.isEnabled()).toBe(true);

    page.loginSubmitButton.click();

    browser.driver.sleep(500);
    expect(browser.getCurrentUrl()).toContain('/dashboard');

    const getStoredUser = "return window.localStorage.getItem('currentuser');";
    browser.executeScript(getStoredUser).then((user) => {
      expect(user).toBeTruthy();
      expect(user).toContain('email@email.com');
    });

    page.navigateTo('/halls/edit/1');
    expect(browser.getCurrentUrl()).toContain('/halls/edit/1');
    browser.driver.sleep(500);
    expect(page.hallEditSubmitButton.isEnabled()).toBe(true);

    page.hallEditNameInput.sendKeys(
      protractor.Key.chord(protractor.Key.CONTROL, 'a')
    );
    page.hallEditNameInput.sendKeys(protractor.Key.BACK_SPACE);
    expect(page.hallEditSubmitButton.isEnabled()).toBe(false);
  });
});
