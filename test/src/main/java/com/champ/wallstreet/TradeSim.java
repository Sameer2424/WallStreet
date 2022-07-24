
package com.champ.wallstreet;

import com.champ.wallstreet.object.*;
import java.util.*;
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
import java.net.MalformedURLException;
import java.net.URL;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;


import com.champ.wallstreet.object.*;

public class TradeSim extends Simulator
{



    public void gotoPlayer(String playerName)
    {
        waitFor(2);
        // 4 | click | id=query |
        driver.findElement(By.id("query")).click();
        driver.findElement(By.id("query")).sendKeys(playerName);
        waitFor(2);
        driver.findElement(By.cssSelector(".btn")).click();

        driver.findElement(By.linkText(playerName)).click();

    }

    public void executeBuy(int quantity ) {

        // 8 | click | css=.buy-btn |
        driver.findElement(By.cssSelector(".buy-btn")).click();
        // 9 | click | name=quantity |
        driver.findElement(By.name("quantity")).click();

        String s = Integer.toString(quantity);
        driver.findElement(By.name("quantity")).sendKeys(s);

        driver.findElement(By.cssSelector(".btn-success")).click();

    }

    public void executeSell(int quantity ) {

        driver.findElement(By.cssSelector(".sell-btn")).click();
        driver.findElement(By.name("quantity")).click();

        String s = Integer.toString(quantity);
        driver.findElement(By.name("quantity")).sendKeys(s);

        driver.findElement(By.cssSelector(".btn-success")).click();

    }

    public static List<TradeInfo> getTradesFromJson(String fileName)
    {
        List<TradeInfo> trades = null;
        try {

            // create Gson instance
            Gson gson = new Gson();

            // create a reader
            Reader reader = Files.newBufferedReader(Paths.get(fileName));

            // convert JSON file
            trades = gson.fromJson(reader, new TypeToken<List<TradeInfo>>(){}.getType());


            // print
            for (TradeInfo item:trades)
            {
                System.out.println(gson.toJson(item));
            }

            // close reader
            reader.close();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return trades;
    }

    public void enterMarket()
    {
        driver.get("http://env-again.eba-4f5yrbpe.us-west-1.elasticbeanstalk.com/");
        driver.manage().window().setSize(new Dimension(1936, 1056));
        driver.findElement(By.linkText("Enter Market")).click();

    }


    public void login()
    {
        driver.findElement(By.id("id_username")).click();
        // 5 | type | id=id_username | test1
        driver.findElement(By.id("id_username")).sendKeys("test1");
        // 6 | click | id=id_password |
        driver.findElement(By.id("id_password")).click();
        // 7 | type | id=id_password | test1
        driver.findElement(By.id("id_password")).sendKeys("test1");
        // 8 | click | css=.auth_form__btn-text |
        driver.findElement(By.cssSelector(".auth_form__btn-text")).click();

    }

    public static void main (String[] args) throws Exception
    {
        if (args.length > 0 )
        {
            String fileName = "players.json";
            Gson gson = new Gson();
            if (args[0].equalsIgnoreCase("datagen"))
            {
                // create a reader
                Reader reader = Files.newBufferedReader(Paths.get(fileName));

                // convert JSON file
                String[] players  = gson.fromJson(reader, String[].class);
                List<TradeInfo> list = new ArrayList<TradeInfo>();

                TradeInfo trade = null;
                for (int i = 0; i < players.length; i++)
                {
                    trade =  new TradeInfo();
                    trade.playerName = players[i];
                    trade.buySell = 1; // buy
                    trade.quantity = 1;
                    list.add(trade);
                }
                String json = gson.toJson(list);
                System.out.println(json);

                // write to out.json
                File file = new File("out.json");


            }
            return;
        }


        TradeSim T = new TradeSim();
        T.setUp();
        T.enterMarket();
        waitFor(2);

        T.login();
        waitFor(1);

        // get players and quantity to buy/sell from json file
        List<TradeInfo> trades = getTradesFromJson("trades.json");

        for (int  i=0; i < 100; i++) {

            for (TradeInfo trade : trades) {
                T.gotoPlayer(trade.playerName);
                waitFor(2);
                if (trade.buySell == 1)
                    T.executeBuy(trade.quantity);
                else
                    T.executeSell(trade.quantity);
                waitFor(1);

            }

            waitFor(2);
            // revere trades
            for (TradeInfo trade : trades) {
                T.gotoPlayer(trade.playerName);
                // note we reverse the trades here
                if (trade.buySell == 2)
                    T.executeBuy(trade.quantity);
                else
                    T.executeSell(trade.quantity);

            }
            waitFor(5);
        }

        T.tearDown();


    }



}