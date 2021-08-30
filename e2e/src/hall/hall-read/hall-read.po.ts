import { CommonPageObject } from '../../common.po';
import { browser, by, element, ElementFinder, Key } from 'protractor';

export class HallReadPage extends CommonPageObject {
  get hallDetailNameField(): ElementFinder {
    return element(by.id('hallDetailNameField')) as ElementFinder;
  }
  get hallDetailDescriptionField(): ElementFinder {
    return element(by.id('hallDetailDescriptionField')) as ElementFinder;
  }
  get hallDetailSeatsField(): ElementFinder {
    return element(by.id('hallDetailSeatsField')) as ElementFinder;
  }
}
