import { UrbanRobotPage } from './app.po';

describe('urban-robot App', function() {
  let page: UrbanRobotPage;

  beforeEach(() => {
    page = new UrbanRobotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
