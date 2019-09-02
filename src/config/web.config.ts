
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import * as winston from "winston";
import { Settings } from "./settings";

/**
 * Configure the HTTP server
 *
 * @author R. Sonke <r.sonke@maxxton.com>
 */
export class WebConfig {

  public init(): void {
    useContainer(Container);
    // creates express app, registers all controller routes and returns you express app instance
    const app = createExpressServer({
      controllers: [__dirname + "/../controllers/**/*.controller.js"]
    });

    // run express application
    const port = Settings.get("WEB_PORT", 8080);
    winston.info("Listen on port " + port);
    app.listen(port);
  }

}
