import { chromium, devices } from "playwright";

// Setup
const browser = await chromium.launch();
const context = await browser.newContext(devices["iPhone 11"]);
await context.addCookies([
  {
    name: "gu-cmp-disabled",
    value: "true",
    domain: ".theguardian.com",
    path: "/",
  },
]);
const page = await context.newPage();

// Add cookie to remove consent banner

// Add headers to permit browser timings
// See https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
await page.route("**/*", async (route) => {
  // Fetch original response.
  const response = await route.fetch();

  await route.fulfill({
    // Pass all fields from the response.
    response,
    // Force content type to be html.
    headers: {
      ...response.headers(),
      "Timing-Allow-Origin": "*",
    },
  });
});

// The actual interesting bit
await page.goto(
  "https://www.theguardian.com/environment/ng-interactive/2025/mar/12/as-countries-scramble-for-minerals-the-seabed-beckons-will-mining-it-be-a-disaster-visual-explainer"
);

const waitForPageLoad = async (timeoutMs = 10000) =>
  await page.evaluate(async (timeoutMs) => {
    await new Promise<void>((resolve, reject) => {
      if (document.readyState == "complete") {
        resolve();
      }
      window.addEventListener("load", () => {
        resolve();
      });
      setTimeout(
        () => reject(`Page took longer than ${timeoutMs}ms to load`),
        timeoutMs
      );
    });
  }, timeoutMs);

const gatherPerformanceData = () =>
  page.evaluate(async () => {
    const performanceData = window.performance;
    const entries = window.performance.getEntries();
    return {
      ...performanceData,
      entries,
    };
  });

await waitForPageLoad();

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

await new Promise((res) => setTimeout(res, 4000));

await page.screenshot({ fullPage: true, path: "./example.png" });

const performanceData = await gatherPerformanceData();

const files = performanceData.entries.reduce((acc, entry) => {
  if (entry.entryType !== "resource") {
    return acc;
  }
  return acc.concat({
    file: (entry as PerformanceResourceTiming).name,
    size: (entry as PerformanceResourceTiming).encodedBodySize,
  });
}, [] as { file: string; size: number }[]);

const fileSize = files.reduce((acc, f) => acc + f.size, 0);

console.log(files);
console.log(fileSize);

// Teardown
await context.close();
await browser.close();

console.log("done");
