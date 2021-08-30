import { CommonPageObject } from '../../common.po';
import { browser, by, element, ElementFinder, Key } from 'protractor';

export class HallEditPage extends CommonPageObject {
  get hallEditNameInput(): ElementFinder {
    return element(by.id('hallEditNameInput')) as ElementFinder;
  }

  get hallEditSeatsInput(): ElementFinder {
    return element(by.id('hallEditSeatsInput')) as ElementFinder;
  }

  get hallEditDescriptionInput(): ElementFinder {
    return element(by.id('hallEditDescriptionInput')) as ElementFinder;
  }

  get hallEditSubmitButton(): ElementFinder {
    return element(by.id('hallEditSubmitButton')) as ElementFinder;
  }

  get loginEmailInput(): ElementFinder {
    return element(by.id('loginEmailInput')) as ElementFinder;
  }

  get loginPasswordInput(): ElementFinder {
    return element(by.id('loginPasswordInput')) as ElementFinder;
  }

  get loginSubmitButton(): ElementFinder {
    return element(by.id('loginSubmitButton')) as ElementFinder;
  }
}
