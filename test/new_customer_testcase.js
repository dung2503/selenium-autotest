const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("New customer", function () {
  let driver;
  let nc001Flag;

  this.timeout(99999);

  function generateRandomEmail() {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const randomString = (length) => {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const username = randomString(8); // Tạo phần tên người dùng ngẫu nhiên dài 8 ký tự
    const domain = domains[Math.floor(Math.random() * domains.length)]; // Chọn một domain ngẫu nhiên
    return `${username}@${domain}`;
  }

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://demo.guru99.com/V4");

    let uid = await driver.findElement(By.name("uid"));
    let password = await driver.findElement(By.name("password"));
    let loginButton = await driver.findElement(By.name("btnLogin"));
    await uid.sendKeys("mngr599495");
    await password.sendKeys("enAzUny");
    await loginButton.click();
  });

  after(async function () {
    await driver.quit();
  });

  it("NC-001", async function () {
    let title = await driver.getTitle();
    assert.strictEqual(
      title,
      "Guru99 Bank Manager HomePage",
      "Tiêu đề không khớp!"
    );
    let barone = await driver.findElement(By.css("h2.barone"));
    let baroneText = await barone.getText();
    assert.strictEqual(baroneText, "Guru99 Bank", "Tiêu đề barone không khớp!");

    let menusubnav = await driver.findElements(By.css("ul.menusubnav"));
    assert.strictEqual(menusubnav.length > 0, true, "Không có bảng submenu!");
    nc001Flag = true;
  });

  it("NC-002", async function () {
    assert.strictEqual(nc001Flag, true, "NC-001 chưa pass");
  });

  it("NC-003", async function () {
    // Nhấn vào tab New customer
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();

    // Nhập giá trị Trống vào ô customer name
    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường Customer Name sau khi chuyển trang"
    );
    await customerName.sendKeys("");

    // Lấy giá trị thông báo và kiểm tra nội dung thông báo
    let message = await driver.findElement(By.id("message"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();

    // Điều kiện expect result
    assert.strictEqual(
      messageText,
      "Customer name must not be blank",
      "Message không hiển thị đúng khi bỏ trống trường customerName"
    );
  });

  it("NC-004", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường Customer Name sau khi chuyển trang"
    );
    await customerName.sendKeys("Aisha");
    let message = await driver.findElement(By.id("message"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị khi nhập giá trị hợp lệ"
    );
  });

  it("NC-005", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường Customer Name sau khi chuyển trang"
    );
    await customerName.sendKeys(" Aisha");
    let message = await driver.findElement(By.id("message"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-006", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường Customer Name sau khi chuyển trang"
    );
    await customerName.sendKeys("@!%#$@a");
    let message = await driver.findElement(By.id("message"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-007", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường Customer Name sau khi chuyển trang"
    );
    await customerName.sendKeys("123456789");
    let message = await driver.findElement(By.id("message"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Numbers are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-008", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );
    await inputAddress.sendKeys("");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Address Field must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-009", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );
    await inputAddress.sendKeys("294 Nguyen Luong Bang");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-010", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );
    await inputAddress.sendKeys(" 294 Nguyen Luong Bang");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-011", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );
    await inputAddress.sendKeys("@#!@#");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-012", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "City Field must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-013", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("Da Nang");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-014", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys(" Da Nang");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character can not have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-015", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("@!%#$@");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special character are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-016", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("123456789");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Numbers are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-017", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "State must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-018", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("Lien Chieu");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-019", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys(" Lien Chieu");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-020", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("@!%#$@");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-021", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("123456789");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Numbers are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-022", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "PIN Code must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-023", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("-12345");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "PIN Code must contain 6 positive digits only",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-024", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("1234");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "PIN Code must have 6 Digits",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-025", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("123456");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-026", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("12345678");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
    let pinValue = await inputPIN.getText();
    assert.strictEqual(pinValue.length, 6, "Độ dài giá trị của PIN vượt quá 6");
  });

  it("NC-027", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys(" 12345");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character can not have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-028", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("@!#@%$");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-029", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("aishaa");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-030", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Mobile no must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-031", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("123456");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-032", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys(" 12345");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character can not have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-033", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("@!#@%$");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-034", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("aishaa");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Character are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-035", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Email sau khi chuyển trang"
    );
    await inputEmail.sendKeys("");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Email ID must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-036", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Email sau khi chuyển trang"
    );
    await inputEmail.sendKeys("user123@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-037", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Email sau khi chuyển trang"
    );
    await inputEmail.sendKeys(" user12@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character can not have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-038", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Email sau khi chuyển trang"
    );
    await inputEmail.sendKeys("user2@@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Email ID is not valid",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-039", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường email sau khi chuyển trang"
    );
    await inputEmail.sendKeys("phanhoangdung144@gmail.com");

    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường customerName sau khi chuyển trang"
    );
    await customerName.sendKeys("Aisha");

    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường address sau khi chuyển trang"
    );
    await inputAddress.sendKeys("294 Nguyen Luong Bang");

    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("Da Nang");

    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("Lien Chieu");

    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("123456");

    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("123456");

    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("12122002");

    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      5000,
      "Không tìm thấy mật khẩu"
    );
    await password.sendKeys("12122000");

    let submitButton = await driver.findElement(By.name("sub"));
    await submitButton.click();

    await driver.wait(until.alertIsPresent(), 6000);
    let alert = await driver.switchTo().alert();

    let alertText = await alert.getText();
    assert.strictEqual(
      alertText,
      "Email Address Already Exist !!",
      "Alert message không đúng"
    );

    // Chấp nhận (hoặc từ chối) alert
    await alert.accept(); // hoặc alert.dismiss();
  });

  it("NC-040", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    const fieldsFromSRS = [
      "Customer Name",
      "Date of Birth",
      "Address",
      "City",
      "State",
      "PIN",
      "Mobile Number",
      "E-mail",
      "Password"
    ];

    for (let fieldName of fieldsFromSRS) {
      let fieldElement = await driver.findElement(
        By.xpath(`//*[text()="${fieldName}"]`)
      );

      assert.ok(
        await fieldElement.isDisplayed(),
        `Trường "${fieldName}" không hiển thị trên giao diện`
      );
    }
  });

  it("NC-041", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường email sau khi chuyển trang"
    );

    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường customerName sau khi chuyển trang"
    );

    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );

    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      5000,
      "Không tìm thấy mật khẩu"
    );

    let submitButton = await driver.findElement(By.name("sub"));
    await submitButton.click();

    await driver.wait(until.alertIsPresent(), 6000);
    let alert = await driver.switchTo().alert();

    let alertText = await alert.getText();
    assert.strictEqual(
      alertText,
      "please fill all fields", // expected result
      "Alert message không đúng"
    );
    await alert.accept();
  });

  it("NC-042", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();

    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường customerName sau khi chuyển trang"
    );
    await customerName.sendKeys("Aisha");

    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("12122002");

    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );
    await inputAddress.sendKeys("294 Nguyen Luong Bang");

    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("Da Nang");

    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("Lien Chieu");

    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("123456");

    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("123456");

    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường email sau khi chuyển trang"
    );
    const randomEmail = generateRandomEmail();
    await inputEmail.sendKeys(randomEmail);

    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      5000,
      "Không tìm thấy mật khẩu"
    );
    await password.sendKeys("12122000");

    let submitButton = await driver.findElement(By.name("sub"));
    await submitButton.click();
    //heading3 == Customer Registered Successfully!!!
    let headingSuccess = await driver.wait(
      until.elementLocated(By.className("heading3")),
      5000,
      "Không tìm thấy Customer Registered Successfully!!!"
    );
    assert.strictEqual(headingSuccess, "Customer Registered Successfully!!!", "Not Successful!");
    const customerNameResult = await driver.findElement(By.xpath("//td[text()='Customer Name']/following-sibling::td")).getText();
    assert.strictEqual(customerNameResult === "Aisha", true, `Expected Aisha, but got ${customerName}`);

    const gender = await driver.findElement(By.xpath("//td[text()='Gender']/following-sibling::td")).getText();
    assert.strictEqual(gender === "male", true, `Expected male, but got ${gender}`);

    const birthdate = await driver.findElement(By.xpath("//td[text()='Birthdate']/following-sibling::td")).getText();
    assert.strictEqual(birthdate === "2002-12-12", true, `Expected 2002-12-12, but got ${birthdate}`);

    const address = await driver.findElement(By.xpath("//td[text()='Address']/following-sibling::td")).getText();
    assert.strictEqual(address === "294 Nguyen Luong Bang", true, `Expected 294 Nguyen Luong Bang, but got ${address}`);

    const city = await driver.findElement(By.xpath("//td[text()='City']/following-sibling::td")).getText();
    assert.strictEqual(city === "Da Nang", true, `Expected Da nang, but got ${city}`);

    const state = await driver.findElement(By.xpath("//td[text()='State']/following-sibling::td")).getText();
    assert.strictEqual(state === "Lien Chieu", true, `Expected Lien Chieu, but got ${state}`);

    const pin = await driver.findElement(By.xpath("//td[text()='Pin']/following-sibling::td")).getText();
    assert.strictEqual(pin === "123456", true, `Expected 123456, but got ${pin}`);

    const mobileNo = await driver.findElement(By.xpath("//td[text()='Mobile No.']/following-sibling::td")).getText();
    assert.strictEqual(mobileNo === "123456", true, `Expected 123456, but got ${mobileNo}`);

    const email = await driver.findElement(By.xpath("//td[text()='Email']/following-sibling::td")).getText();
    assert.strictEqual(email === randomEmail, true, `Expected ${randomEmail}, but got ${email}`);
  });

  it("NC-043", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();

    let customerName = await driver.wait(
      until.elementLocated(By.name("name")),
      5000,
      "Không tìm thấy trường customerName sau khi chuyển trang"
    );
    await customerName.sendKeys("Aisha");

    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("12122002");

    let inputAddress = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );
    await inputAddress.sendKeys("294 Nguyen Luong Bang");

    let inputCity = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );
    await inputCity.sendKeys("Da Nang");

    let inputState = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );
    await inputState.sendKeys("Lien Chieu");

    let inputPIN = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );
    await inputPIN.sendKeys("123456");

    let inputTelephoneNumber = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await inputTelephoneNumber.sendKeys("123456");

    let inputEmail = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường email sau khi chuyển trang"
    );
    await inputEmail.sendKeys("phanhoangdung144+c2@gmail.com");

    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      5000,
      "Không tìm thấy mật khẩu"
    );
    await password.sendKeys("12122000");

    let resetButton = await driver.findElement(By.name("res"));
    await resetButton.click();

    await driver.sleep(2000); // Tạm chờ 2 giây

    assert.strictEqual(await driver.findElement(By.name("name")).getAttribute("value"), '', 'Trường Customer Name không được reset');
    assert.strictEqual(await driver.findElement(By.name("dob")).getAttribute("value"), '', 'Trường Date of Birth không được reset');
    assert.strictEqual(await driver.findElement(By.name("addr")).getAttribute("value"), '', 'Trường Address không được reset');
    assert.strictEqual(await driver.findElement(By.name("city")).getAttribute("value"), '', 'Trường City không được reset');
    assert.strictEqual(await driver.findElement(By.name("state")).getAttribute("value"), '', 'Trường State không được reset');
    assert.strictEqual(await driver.findElement(By.name("pinno")).getAttribute("value"), '', 'Trường PIN không được reset');
    assert.strictEqual(await driver.findElement(By.name("telephoneno")).getAttribute("value"), '', 'Trường Mobile Number không được reset');
    assert.strictEqual(await driver.findElement(By.name("emailid")).getAttribute("value"), '', 'Trường Email không được reset');
    assert.strictEqual(await driver.findElement(By.name("password")).getAttribute("value"), '', 'Trường Password không được reset');

  });

  it("NC-044", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("");
    let message = await driver.findElement(By.id("message24"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Date Field must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-045", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("32132222");
    //let message = await driver.findElement(By.id("message24"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let dobValue = await dob.getAttribute("value");
    assert.strictEqual(
      dobValue,
      "31122222",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it.skip("NC-046", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("02021900");
    let message = await driver.findElement(By.id("message24"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Thông báo lỗi", //không có trong srs
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it.skip("NC-047", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("02022009");
    let message = await driver.findElement(By.id("message24"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Thông báo lỗi", //không có trong srs
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  //case 26 và case 48 
  it.skip("NC-048", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("nneeydhf");
    let message = await driver.findElement(By.id("message24"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "", //không có trong srs
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-049", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let dob = await driver.wait(
      until.elementLocated(By.name("dob")),
      5000,
      "Không tìm thấy trường Date of Birth sau khi chuyển trang"
    );
    await dob.sendKeys("19042000");
    let message = await driver.findElement(By.id("message24"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-050", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      5000,
      "Không tìm thấy trường Password sau khi chuyển trang"
    );
    await password.sendKeys("");
    let message = await driver.findElement(By.id("message18"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Password must not be blank",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("NC-051", async function () {
    let newCustomerTab = await driver.findElement(
      By.css("a[href='addcustomerpage.php']")
    );
    await newCustomerTab.click();
    let password = await driver.wait(
      until.elementLocated(By.name("password")),
      5000,
      "Không tìm thấy trường Password sau khi chuyển trang"
    );
    await password.sendKeys("123Asd@");
    let message = await driver.findElement(By.id("message18"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });
});
