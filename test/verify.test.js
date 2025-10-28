const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should create a function named oldEnough that takes an age and returns the string "old enough" if the age is over 17', async function() {
      const result = await page.evaluate(() => {
        return oldEnough(18);
      });

      expect(result).toBe('old enough');
  });

  it('should not return the string "old enough" if an age of 17 is passed to oldEnough', async function() {
      const result = await page.evaluate(() => {
        return oldEnough(17);
      });

      expect(result).not.toBe('old enough');
  });

  it('should create a function named underAge that takes an age and returns the string "under age" if the age is under 18', async function() {
      const result = await page.evaluate(() => {
        return underAge(17);
      });

      expect(result).toBe('under age');
  });

  it('should not return the string "under age" if an age of 18 is passed to underAge', async function() {
      const result = await page.evaluate(() => {
        return underAge(18);
      });

      expect(result).not.toBe('under age');
  });

  it('should create a function named legalSpeed that takes a speed and returns the string "legal speed" if the speed is under 50', async function() {
      const result = await page.evaluate(() => {
        return legalSpeed(49);
      });

      expect(result).toBe('legal speed');
  });

  it('should return the string "legal speed" if a speed of 50 is passed to legalSpeed', async function() {
      const result = await page.evaluate(() => {
        return legalSpeed(50);
      });

      expect(result).toBe('legal speed');

  });

  it('should not return the string "legal speed" if a speed of 51 is passed to legalSpeed', async function() {
      const result = await page.evaluate(() => {
        return legalSpeed(51);
      });

      expect(result).not.toBe('legal speed');
  });

  it('should create a function named isGoldenYears that takes an age and returns the string "golden years" if the age is over 65', async function() {
      const result = await page.evaluate(() => {
        return isGoldenYears(66);
      });

      expect(result).toBe('golden years');
  });

  it('should return the string "golden years" if an age of 65 is passed to isGoldenYears', async function() {
      const result = await page.evaluate(() => {
        return isGoldenYears(65);
      });

      expect(result).toBe('golden years');        
  });

  it('should not return the string "golden years" if an age of 64 is passed to isGoldenYears', async function() {
      const result = await page.evaluate(() => {
        return isGoldenYears(64);
      });

      expect(result).not.toBe('golden years');
  });
});

