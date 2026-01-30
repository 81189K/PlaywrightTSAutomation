import {test} from "../fixtures/loginFixture";
import logger from "../utils/LoggerUtil";

test("Custom Fixture test", async ({ dashboardPage }) => {
    await dashboardPage.validateDashboardTitle();
    logger.info("Successfully tested custom fixture");
});


// fixture will be executed before this test runs, ensuring the user is logged in and on the dashboard page.

/*** Test Lifecycle Visualization:
[ Create Page ]
      ↓
[ Login ]
      ↓
[ Validate Dashboard ]
      ↓
[ Provide dashboardPage to test ]
      ↓
[ Test executes ]
      ↓
[ Cleanup ]
***/