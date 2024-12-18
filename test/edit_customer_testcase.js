const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Edit Customer", function () {
  let driver;
  let nc001Flag;

  this.timeout(99999);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    driver.get("http://demo.guru99.com/V4");

    let uid = await driver.findElement(By.name("uid"));
    let password = await driver.findElement(By.name("password"));
    let loginButton = await driver.findElement(By.name("btnLogin"));
    await uid.sendKeys("mngr603316");
    await password.sendKeys("AsanehA");
    await loginButton.click();
  });

  after(async function () {
    await driver.quit();
  });

  it("EC-001", async function () {
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

  it("EC-002", async function () {
    assert.strictEqual(nc001Flag, true, "NC-001 chưa pass");
  });

  it("EC-003", async function () {
    // Nhấn vào tab Edit Customer
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();

    // Nhập giá trị trống vào ô Customer ID
    let customerID = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường Customer ID sau khi chuyển trang"
    );
    await customerID.sendKeys("");

    let message = await driver.findElement(By.id("message14"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();

    assert.strictEqual(
      messageText,
      "Customer ID is required",
      "Message không hiển thị đúng khi bỏ trống trường customerID"
    );
  });

  it("EC-004", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    //heading3 == Edit Customer Successfully!!!
    let headingSuccess = await driver.wait(
      until.elementLocated(By.className("heading3")),
      6000,
      "Không tìm thấy element heading"
    );

    assert.strictEqual(await headingSuccess.getText(), "Edit Customer", "Không tìm thấy title 'Edit Customer'");

    const customerName = await driver.findElement(By.xpath("//td[text()='Customer Name']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(customerName === "Aiaa", true, `Expected Aiaa, but got ${customerName}`);

    const gender = await driver.findElement(By.xpath("//td[text()='Gender']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(gender === "male", true, `Expected male, but got ${gender}`);

    const birthdate = await driver.findElement(By.xpath("//td[text()='Date of Birth']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(birthdate === "2004-03-25", true, `Expected 2004-03-25, but got ${birthdate}`);

    const address = await driver.findElement(By.xpath("//td[text()='Address']/following-sibling::td/textarea")).getAttribute("value");
    assert.strictEqual(address === "Hoa Khanh Nam", true, `Expected Hoa Khanh Nam, but got ${address}`);

    const city = await driver.findElement(By.xpath("//td[text()='City']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(city === "Da Nang", true, `Expected Da nang, but got ${city}`);

    const state = await driver.findElement(By.xpath("//td[text()='State']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(state === "Lien Chieu", true, `Expected Lien Chieu, but got ${state}`);

    const pin = await driver.findElement(By.xpath("//td[text()='PIN']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(pin === "250303", true, `Expected 250303, but got ${pin}`);

    const mobileNo = await driver.findElement(By.xpath("//td[text()='Mobile Number']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(mobileNo === "987654321", true, `Expected 987654321, but got ${mobileNo}`);

    const email = await driver.findElement(By.xpath("//td[text()='E-mail']/following-sibling::td/input")).getAttribute("value");
    assert.strictEqual(email === "phanhoangdung144+m4@gmail.com", true, `Expected phanhoangdung144+m4@gmail.com, but got ${email}`);

  });

  it("EC-005", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường Customer ID sau khi chuyển trang"
    );

    await customerIDField.sendKeys(" 123456");
    let message = await driver.findElement(By.id("message14"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();

    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("EC-006", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường Customer ID sau khi chuyển trang"
    );

    await customerIDField.sendKeys("@!%#$@a");
    let message = await driver.findElement(By.id("message14"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();

    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("EC-007", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường Customer ID sau khi chuyển trang"
    );

    await customerIDField.sendKeys("aishaa");
    let message = await driver.findElement(By.id("message14"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();

    assert.strictEqual(
      messageText,
      "Characters are not allowed",
      "Message hiển thị sai, không đúng yêu cầu"
    );;
  });

  it("EC-008", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường Customer ID sau khi chuyển trang"
    );

    await customerIDField.sendKeys("123 456");
    let message = await driver.findElement(By.id("message14"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();

    assert.strictEqual(
      messageText,
      "Customer ID cannot have blank space",
      "Message hiển thị sai, không đúng yêu cầu"
    );
  });

  it("EC-009", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let addressField = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    await addressField.clear();
    await addressField.sendKeys("");
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

  it("EC-010", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let addressField = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    await addressField.clear();
    await addressField.sendKeys("Hang Dao");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Message hiển thị khi nhập giá trị hợp lệ"
    );
  });

  it("EC-011", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let addressField = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    await addressField.clear();
    await addressField.sendKeys(" Hang Dao");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Message hiển thị khi nhập giá trị hợp lệ"
    );
  });

  it("EC-012", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );
    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let addressField = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    await addressField.clear();
    await addressField.sendKeys("@#!@#");
    let message = await driver.findElement(By.id("message3"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Message hiển thị khi nhập giá trị hợp lệ"
    );
  });

  it("EC-013", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys("");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "City Field must not be blank",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-014", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys("Ha Noi");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-015", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys(" Ha Noi");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-016", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys("@!%#$@");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-017", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys("123456789");
    let message = await driver.findElement(By.id("message4"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Numbers are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-018", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys("");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "State must not be blank",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-019", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys("Hoan Kiem");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-020", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys(" Hoan Kiem");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-021", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys("@!%#$@");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-022", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys("123456789");
    let message = await driver.findElement(By.id("message5"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Numbers are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-023", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys("");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "PIN Code must not be blank",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-024", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys("123456");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-025", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys(" 23456");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-026", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys("@!#@%$");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-027", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys("aishaa");
    let message = await driver.findElement(By.id("message6"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Characters are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });


  it("EC-028", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys("");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Mobile number must not be blank",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-029", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys("987654321");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-030", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys(" 987654321");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-031", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys("@!#@%$");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Special characters are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-032", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys("aishaaA");
    let message = await driver.findElement(By.id("message7"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Characters are not allowed",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-033", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await emailField.clear();;
    await emailField.sendKeys("");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Email ID must not be blank",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-034", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await emailField.clear();;
    await emailField.sendKeys("user123@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-035", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await emailField.clear();;
    await emailField.sendKeys(" user123@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "First character cannot have space",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-036", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await emailField.clear();;
    await emailField.sendKeys("user123@@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Email ID is not valid",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-037", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await emailField.clear();;
    await emailField.sendKeys("phanhoangdung144+c1@gmail.com");
    let message = await driver.findElement(By.id("message9"));
    let barone = await driver.findElement(By.css("h2.barone"));
    await barone.click();
    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "",
      "Thông báo lỗi hiển thị không đúng yêu cầu"
    );
  });

  it("EC-039", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();


    let addressField = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    await addressField.clear();
    await addressField.sendKeys("35ThanhHoa");

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys("DaNangCity");

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys("CamLe");

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys("140323");

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys("0984616375");

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await emailField.clear();;
    await emailField.sendKeys("dangduynguyen@gmail.com");

    let resetButton = await driver.findElement(By.name("res"));
    await resetButton.click();

    await driver.sleep(2000); // Tạm chờ 2 giây

    assert.strictEqual(await driver.findElement(By.name("addr")).getAttribute("value"), 'Hoa Khanh Nam', 'Trường Address không được reset');
    assert.strictEqual(await driver.findElement(By.name("city")).getAttribute("value"), 'Da Nang', 'Trường City không được reset');
    assert.strictEqual(await driver.findElement(By.name("state")).getAttribute("value"), 'Lien Chieu', 'Trường State không được reset');
    assert.strictEqual(await driver.findElement(By.name("pinno")).getAttribute("value"), '250303', 'Trường PIN không được reset');
    assert.strictEqual(await driver.findElement(By.name("telephoneno")).getAttribute("value"), '987654321', 'Trường Mobile Number không được reset');
    assert.strictEqual(await driver.findElement(By.name("emailid")).getAttribute("value"), 'phanhoangdung144+m4@gmail.com', 'Trường E-mail không được reset');
  });

  it.skip("EC-040", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();


    let addressField = await driver.wait(
      until.elementLocated(By.name("addr")),
      5000,
      "Không tìm thấy trường Address sau khi chuyển trang"
    );

    await addressField.clear();
    await addressField.sendKeys("");

    let cityField = await driver.wait(
      until.elementLocated(By.name("city")),
      5000,
      "Không tìm thấy trường City sau khi chuyển trang"
    );

    await cityField.clear();;
    await cityField.sendKeys("");

    let stateField = await driver.wait(
      until.elementLocated(By.name("state")),
      5000,
      "Không tìm thấy trường State sau khi chuyển trang"
    );

    await stateField.clear();;
    await stateField.sendKeys("");

    let pinField = await driver.wait(
      until.elementLocated(By.name("pinno")),
      5000,
      "Không tìm thấy trường PIN sau khi chuyển trang"
    );

    await pinField.clear();;
    await pinField.sendKeys("");

    let mobileField = await driver.wait(
      until.elementLocated(By.name("telephoneno")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );

    await mobileField.clear();;
    await mobileField.sendKeys("");

    let emailField = await driver.wait(
      until.elementLocated(By.name("emailid")),
      5000,
      "Không tìm thấy trường Mobile Number sau khi chuyển trang"
    );
    await emailField.clear();;
    await emailField.sendKeys("");

    let submitButton2 = await driver.findElement(By.name("sub"));
    await submitButton2.click();

    await driver.wait(until.alertIsPresent(), 6000);
    let alert = await driver.switchTo().alert();

    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Please fill all fields",
      "Alert message không đúng"
    );
    await alert.accept();
  });

  it.skip("EC-041", async function () {
    let editCustomerTab = await driver.findElement(
      By.css("a[href='EditCustomer.php']")
    );

    await editCustomerTab.click();
    let customerIDField = await driver.wait(
      until.elementLocated(By.name("cusid")),
      5000,
      "Không tìm thấy trường customerID sau khi chuyển trang"
    );
    await customerIDField.sendKeys("19200");

    let submitButton = await driver.findElement(By.name("AccSubmit"));
    await submitButton.click();

    let submitButton2 = await driver.findElement(By.name("sub"));
    await submitButton2.click();

    await driver.wait(until.alertIsPresent(), 6000);
    let alert = await driver.switchTo().alert();

    let messageText = await message.getText();
    assert.strictEqual(
      messageText,
      "Please fill all fields",
      "Alert message không đúng"
    );
    await alert.accept();
  });



});
