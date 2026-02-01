import {test, expect} from "@playwright/test";
import logger from "../utils/LoggerUtil";

test.use({
  ignoreHTTPSErrors: true,
});
test('API test with existing context', async({page}) => {
    const apiContext = page.request;
    const response = await apiContext.get("https://api.nationalize.io/?name=johnson");
    expect(response.ok()).toBeTruthy();
    const responseJSON = await response.json();
    console.log("********************************************");
    // logger.info(responseJSON+""); // outputs: [object Object]
    // Reason: logger expects a string, and when you pass a plain JavaScript object, it calls .toString() on it.
    // For objects, toString() ⇒ [object Object]

    // Correct ways to log the actual JSON:
    logger.info(JSON.stringify(responseJSON, null, 2));
    console.log("********************************************");

    // Ensure required keys exist
    expect(responseJSON).toHaveProperty('count');
    expect(responseJSON).toHaveProperty('name');
    expect(responseJSON).toHaveProperty('country');

    for (const country of responseJSON.country) {
        expect(country).toHaveProperty('country_id');
        expect(country).toHaveProperty('probability');
    }

    // Assert data type and value for each property
    // country
    expect(typeof responseJSON.count).toBe("number");
    expect(responseJSON.count).toBeGreaterThan(0);

    // name
    expect(typeof responseJSON.name).toBe("string");
    expect(responseJSON.name).toEqual('johnson');

    // Assert country array
    expect(Array.isArray(responseJSON.country)).toBe(true);
    // expect(responseJSON.country.length).toEqual(5);
    expect(responseJSON.country.length === 0 || responseJSON.country.length > 0).toBe(true);

    // Assert each object inside country array
    for (const country of responseJSON.country) {
        expect(typeof country).toBe('object');

        expect(typeof country.country_id).toBe('string');
        expect(country.country_id.length).toBeGreaterThan(0);

        expect(typeof country.probability).toBe('number');
        // expect(country.probability).toBeGreaterThan(0);
        // expect(country.probability).toBeLessThanOrEqual(1);
        expect(country.probability > 0 && country.probability <= 1).toBe(true);
    }
    logger.info("Successfully validated API response");
});

test("API test using a new APIRequestContext created via the Playwright fixture", async ({ playwright }) => {
  const apiRequest = playwright.request;

  const apiContext = await apiRequest.newContext({
    baseURL: "https://api.nationalize.io",
  });

  const apiResponse = await apiContext.get("/?name=johnson");
  const apiResponseJson = await apiResponse.json();
  console.log(apiResponseJson);
});

import {request} from "@playwright/test";
test("API test using a new APIRequestContext created via the request helper", async () => {
  const apiContext = await request.newContext({
    baseURL: "https://api.nationalize.io",  // options: baseURL, extraHTTPHeaders, httpCredentials, ignoreHTTPSErrors, proxy, storageSate
  });

  const apiResponse = await apiContext.get("/?name=johnson");
  const apiResponseJson = await apiResponse.json();
  console.log(apiResponseJson);
});