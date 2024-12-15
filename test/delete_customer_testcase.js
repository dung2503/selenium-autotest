const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { availableParallelism } = require("os");

describe("Delete Customer", function () {
    let driver;
    let nc001Flag;

    this.timeout(99999);

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

    it("DC-001", async function () {
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

    it("DC-002", async function () {
        assert.strictEqual(nc001Flag, true, "DC-001 chưa pass");
    });

    it("DC-003", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

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
            "Message hiển thị sai, không đúng yêu cầu"
        );
    });

    it("DC-004", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("63800");

        let message = await driver.findElement(By.id("message14"));
        let barone = await driver.findElement(By.css("h2.barone"));
        await barone.click();
        let messageText = await message.getText();
        assert.strictEqual(
            messageText,
            "",
            "Message hiển thị sai, không đúng yêu cầu"
        );
    }); //làm cách nào để check điều kiện đã tồn tại customer ID

    it("DC-005", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys(" 12345");

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

    it("DC-006", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("@!#@%");

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

    it("DC-007", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("aisha");

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

    it("DC-008", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("123 45");

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

    it("DC-009", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("12345");

        let submitButton = await driver.findElement(By.name("AccSubmit"));
        await submitButton.click();

        await driver.wait(until.alertIsPresent(), 6000);
        let alert = await driver.switchTo().alert();

        let alertText = await alert.getText();
        assert.strictEqual(
            alertText,
            "Do you really want to delete this Customer?",
            "Alert message không đúng"
        );

        await alert.accept();

        try {
            await driver.wait(until.alertIsPresent(), 6000);
            let nextAlert = await alert.getText();
            assert.strictEqual(
                nextAlert,
                "Customer does not exist!!",
                "Alert message không đúng"
            );
            await alert.accept();
        } catch (error) {
            console.log("Alert không hiển thị");
        };
    });

    it("DC-010", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        
        await deleteCustomerTab.click();
        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );

        let submitButton = await driver.findElement(By.name("AccSubmit"));
        await submitButton.click();

        await driver.wait(until.alertIsPresent(), 6000);
        let alert = await driver.switchTo().alert();

        let alertText = await alert.getText();
        assert.strictEqual(
            alertText,
            "Please fill all fields",
            "Alert message không đúng"
        );
        await alert.accept();

    });

    it("DC-012", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("47720");

        let resetButton = await driver.findElement(By.name("res"));
        await resetButton.click();

        await driver.wait(until.alertIsPresent(), 6000);
        let alert = await driver.switchTo().alert();

        let alertText = await alert.getText();
        assert.strictEqual(
            alertText,
            "Do you really want to delete this Customer?",
            "Alert message không đúng"
        );

        await alert.accept();

        let nextAlert = await alert.getText();
        assert.strictEqual(
            nextAlert,
            "please fill all fields",
            "Alert message không đúng"
        );
        await alert.accept();

    });



    it("DC-012", async function () {
        let deleteCustomerTab = await driver.findElement(
            By.css("a[href='DeleteCustomerInput.php']")
        );
        await deleteCustomerTab.click();

        let customerID = await driver.wait(
            until.elementLocated(By.name("cusid")),
            5000,
            "Không tìm thấy trường Customer ID sau khi chuyển trang"
        );
        await customerID.sendKeys("63800");

        let resetButton = await driver.findElement(By.name("res"));
        await resetButton.click();

        await driver.wait(until.alertIsPresent(), 6000);
        let alert = await driver.switchTo().alert();

        let alertText = await alert.getText();
        assert.strictEqual(
            alertText,
            "Do you really want to delete this Customer?",
            "Alert message không đúng"
        );

        await alert.accept();

        let nextAlert = await alert.getText();
        assert.strictEqual(
            nextAlert,
            "Delete Customer successfully",
            "Alert message không đúng"
        );
        await alert.accept();
    });


});