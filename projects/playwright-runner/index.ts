import { chromium, devices } from "playwright";

export const handler = async () => {
  console.log("Handler running");

  const args = ["--single-process"];
  const assetDir = "/tmp";

  // Setup
  const browser = await chromium.launch({ args });
  const context = await browser.newContext({
    ...devices["iPhone 11"],
    recordVideo: {
      dir: assetDir,
      size: {
        width: 640,
        height: 480,
      },
    },
  });

  // Add cookie to remove consent banner
  await context.addCookies([
    {
      name: "gu-cmp-disabled",
      value: "true",
      domain: ".theguardian.com",
      path: "/",
    },
  ]);

  const page = await context.newPage();

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

  await new Promise((res) => setTimeout(res, 1000));

  const takePageScreenshot = async (pageNo: number) => {
    const path = `${assetDir}/page-${pageNo}.jpg`;
    console.log(`Taking screenshot for ${path}`);
    await page.screenshot({ path, type: "jpeg", quality: 50 });
  };

  const maxScrollHeight = await page.evaluate(() => document.body.scrollHeight);
  let currentScrollPos = 0;
  let pageNo = 1;
  await takePageScreenshot(pageNo);
  while (currentScrollPos < maxScrollHeight) {
    pageNo++;
    currentScrollPos = await page.evaluate(() => window.scrollY);
    await page.evaluate(
      (scrollPos) => window.scrollTo(0, scrollPos + window.innerHeight),
      currentScrollPos
    );
    await takePageScreenshot(pageNo);
  }

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

  await new Promise((res) => setTimeout(res, 1000));

  // Teardown
  await context.close();
  await browser.close();

  const video = await page.video()?.path;
  console.log({ video });

  console.log("done");
};
