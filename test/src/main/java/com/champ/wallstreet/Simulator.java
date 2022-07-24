package com.champ.wallstreet;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.JavascriptExecutor;
import java.util.*;


public abstract class Simulator
{
    protected WebDriver driver;
    protected Map<String, Object> vars;
    protected JavascriptExecutor js;

    public static void waitFor(int secs)
    {
        try {
            Thread.sleep(secs * 1000);
        }
        catch(InterruptedException ex) {
        }
    }
    public void setUp() {
        //TODO remove hardcoding
        System.setProperty("webdriver.chrome.driver", "C:\\side\\bin\\chromedriver.exe");
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        vars = new HashMap<String, Object>();
    }

    public void tearDown() {
        driver.quit();
    }

}