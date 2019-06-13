const MenuController = require("../controllers/MenuController")

describe("MenuController", () => {

  beforeEach(() => {
    this.menu = new MenuController();
  });


  describe("#remindMe()", () => {

    it("should call the reminder", () => {
      expect(this.menu.remindMe()).toBe("Learning is a life-long pursuit");
    });

  });

});