export class UrbanRobotPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('urban-robot-app h1')).getText();
  }
}
