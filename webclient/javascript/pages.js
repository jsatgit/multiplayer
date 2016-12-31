let currentPage = null;

class Pages {
  static show(page) {
    if (currentPage) {
      currentPage.hide();
    }
    currentPage = page;
    page.show();
  }
}

export default Pages;
