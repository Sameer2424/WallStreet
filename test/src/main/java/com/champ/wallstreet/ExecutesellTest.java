package com.champ.wallstreet;

// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class ExecutesellTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void executesell() {
    // Test name: execute sell
    // Step # | name | target | value
    // 1 | open | / | 
    driver.get("http://env-again.eba-4f5yrbpe.us-west-1.elasticbeanstalk.com/");
    // 2 | setWindowSize | 1378x735 | 
    driver.manage().window().setSize(new Dimension(1378, 735));
    // 3 | click | linkText=Enter Market | 
    driver.findElement(By.linkText("Enter Market")).click();
    // 4 | click | id=query | 
    driver.findElement(By.id("query")).click();
    // 5 | type | id=query | Virat Kohli
    driver.findElement(By.id("query")).sendKeys("Virat Kohli");
    // 6 | click | css=.btn | 
    driver.findElement(By.cssSelector(".btn")).click();
    // 7 | click | linkText=VIRAT KOHLI | 
    driver.findElement(By.linkText("VIRAT KOHLI")).click();
    // 8 | click | css=.sell-btn | 
    driver.findElement(By.cssSelector(".sell-btn")).click();
    // 9 | click | name=quantity | 
    driver.findElement(By.name("quantity")).click();
    // 10 | type | name=quantity | 2
    driver.findElement(By.name("quantity")).sendKeys("2");
    // 11 | click | css=.btn-success | 
    driver.findElement(By.cssSelector(".btn-success")).click();
    // 12 | click | css=.alert | 
    driver.findElement(By.cssSelector(".alert")).click();
    // 13 | click | css=.success | 
    driver.findElement(By.cssSelector(".success")).click();
    // 14 | click | id=navbarDropdown | 
    driver.findElement(By.id("navbarDropdown")).click();
    // 15 | click | linkText=Profile | 
    driver.findElement(By.linkText("Profile")).click();
    // 16 | click | css=tr:nth-child(9) | 
    driver.findElement(By.cssSelector("tr:nth-child(9)")).click();
    // 17 | click | css=tr:nth-child(9) > .text-center:nth-child(3) | 
    driver.findElement(By.cssSelector("tr:nth-child(9) > .text-center:nth-child(3)")).click();
  }
}
