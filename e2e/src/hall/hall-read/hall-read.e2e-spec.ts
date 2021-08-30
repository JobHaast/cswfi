import { HallReadPage } from './hall-read.po';
import { browser, logging, element, by, Key } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Hall detail page', () => {
  let page: HallReadPage;

  beforeEach(() => {
    page = new HallReadPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('Should be at /halls/details/1 route', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo('/halls/details/1');
    expect(browser.getCurrentUrl()).toContain('/halls/details/1');
  });

  it('Data show on /halls/details/1 route should be correct', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo('/halls/details/1');
    expect(browser.getCurrentUrl()).toContain('/halls/details/1');

    expect(page.hallDetailNameField.getText()).toContain('Zaal 1');
    expect(page.hallDetailDescriptionField.getText()).toContain(
      'Hier schrijf ik een mooi bulshit stukje over een zaal en hoe mooi deze is whooooooooooo!'
    );
    expect(page.hallDetailSeatsField.getText()).toContain(60);
  });
});
