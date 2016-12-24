import { SkDvktPage } from './app.po';

describe('sk-dvkt App', function() {
  let page: SkDvktPage;

  beforeEach(() => {
    page = new SkDvktPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
