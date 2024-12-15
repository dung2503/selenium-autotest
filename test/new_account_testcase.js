const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("New account", function () {
    let driver;
    let na001Flag;

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
        driver.get("http://demo.guru99.com/V4");

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

    it("NA-001", async function () {
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
        na001Flag = true;
    });

    it("NA-002", async function () {
        assert.strictEqual(na001Flag, true, "NA-001 chưa pass");
    });

    it("NA-003", async function () {
        // Nhấn vào tab New account
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );
        await newAccountTab.click();

        // Nhập giá trị Trống vào ô customer id
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường customerID sau khi chuyển trang"
        );
        await customerID.sendKeys("");

        // Lấy giá trị thông báo và kiểm tra nội dung thông báo
        let message = await driver.findElement(By.id("message14"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        // Điều kiện expect result
        assert.strictEqual(
            messageText,
            "Customer ID is required",
            "Message không hiển thị đúng khi bỏ trống trường customerID"
        );
    });

    it("NA-004", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường customerID sau khi chuyển trang"
        );

        await customerID.sendKeys("47720");
        let message = await driver.findElement(By.id("message14"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "",
            "Message hiển thị khi nhập giá trị hợp lệ"
        );
    });

    it("NA-005", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường customerID sau khi chuyển trang"
        );

        await customerID.sendKeys(" 123456");
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

    it("NA-006", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường customerID sau khi chuyển trang"
        );

        await customerID.sendKeys("@!%#$@a");
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

    it("NA-007", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường customerID sau khi chuyển trang"
        );

        await customerID.sendKeys("aishaa");
        let message = await driver.findElement(By.id("message14"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "Characters are not allowed",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });


    it("NA-008", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường customerID sau khi chuyển trang"
        );

        await customerID.sendKeys("123 456");
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

    // initial Deposit
    it("NA-009", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "Initial deposit must not be blank",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-010", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("-4242");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "Please enter a positive amount",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-011", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("500000");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-012", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("123");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-013", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("1000000000000");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-014", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys(" 123456");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "First character cannot have space",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-015", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("@!%#$@");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "Special characters are not allowed",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-016", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường initial Deposit sau khi chuyển trang"
        );

        await initialDeposit.sendKeys("aishaa");
        let message = await driver.findElement(By.id("message19"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();

        assert.strictEqual(
            messageText,
            "Characters are not allowed",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("NA-017", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );

        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường Initial Deposit sau khi chuyển trang"
        );

        let submitButton = await driver.findElement(By.name("button2"));
        await submitButton.click();

        await driver.wait(until.alertIsPresent(), 6000);
        let alert = await driver.switchTo().alert();

        let alertText = await alert.getText();
        assert.strictEqual(
            alertText,
            "Please fill all fields", // expected result
            "Alert message không đúng"
        );
        await alert.accept();
    });

    it("NA-018", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );

        await newAccountTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("47720");

        let type = await driver.wait(
            until.elementLocated(By.name("selaccount")),
            5000,
            "Không tìm thấy trường Initial Deposit sau khi chuyển trang"
        );
        await type.sendKeys("Savings");

        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường Initial Deposit sau khi chuyển trang"
        );
        await initialDeposit.sendKeys("1221");

        let submitButton = await driver.findElement(By.name("button2"));
        await submitButton.click();

        //heading3 == Account Generated Successfully!!!
        let headingSuccess = await driver.wait(
            until.elementLocated(By.className("heading3")),
            5000,
            "Không tìm thấy tiêu dề Account Generated Successfully!!!"
        );

        assert.strictEqual(await headingSuccess.getText(), "Account Generated Successfully!!!", "Không tìm thấy title 'Account Generated Successfully!!!'");

        const customerId = await driver.findElement(By.xpath("//td[text()='Customer ID']/following-sibling::td")).getText();
        assert.strictEqual(customerId === "47720", true , `Expected 47720, but got ${customerID}`);

        const customerName = await driver.findElement(By.xpath("//td[text()='Customer Name']/following-sibling::td")).getText();
        assert.strictEqual(customerName === "Aiaa", true , `Expected Aiaa, but got ${customerName}`);

        const email = await driver.findElement(By.xpath("//td[text()='Email']/following-sibling::td")).getText();
        assert.strictEqual(email === "phanhoangdung144+c1@gmail.com", true , `Expected phanhoangdung144+c1@gmail.com, but got ${email}`);

        const accountType = await driver.findElement(By.xpath("//td[text()='Account Type']/following-sibling::td")).getText();
        assert.strictEqual(accountType === "Savings", true , `Expected Savings, but got ${type}`);

        const dateOfOpening = await driver.findElement(By.xpath("//td[text()='Date of Opening']/following-sibling::td")).getText();
        assert.strictEqual(dateOfOpening === "2024-12-12", true , `Expected 2024-12-12, but got ${dateOfOpening}`);

        const currentAmount = await driver.findElement(By.xpath("//td[text()='Current Amount']/following-sibling::td")).getText();
        assert.strictEqual(currentAmount === "1221", true , `Expected 1221, but got ${initialDeposit}`);
    });

    it("NA-019", async function () {
        let newAccountTab = await driver.findElement(
            By.css("a[href='addAccount.php']")
        );
        await newAccountTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("47720");

        let initialDeposit = await driver.wait(
            until.elementLocated(By.name("inideposit")),
            5000,
            "Không tìm thấy trường Initial Deposit sau khi chuyển trang"
        );
        await initialDeposit.sendKeys("1221");

        let resetButton = await driver.findElement(By.name("reset"));
        await resetButton.click();

        await driver.sleep(2000); // Tạm chờ 2 giây

        assert.strictEqual(await driver.findElement(By.name("cusid")).getAttribute("value"), '', 'Trường Customer ID không được reset');
        assert.strictEqual(await driver.findElement(By.name("inideposit")).getAttribute("value"), '', 'Trường Initial Depositcls không được reset');
    });

});

