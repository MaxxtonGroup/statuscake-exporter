import { Container } from "typedi";
import * as winston from "winston";
import { StatuscakeClient } from "./clients/statuscake.client";
import { Settings } from "./config/settings";
import { StatuscakeConfig } from "./config/statuscake.config";
import { WebConfig } from "./config/web.config";
import { StatuscakeScraper } from "./scrapers/statuscake.scraper";

Settings.get("NODE_ENV", "dev");

(async () => {

  winston.configure({
    level: Settings.get("LOGGER_LEVEL", "info"),
    transports: [
      new (winston.transports.Console)()
    ]
  });

  const webConfig: WebConfig = Container.get(WebConfig);

  let statuscakeConfig = new StatuscakeConfig();
  let statuscakeClient = new StatuscakeClient(statuscakeConfig);
  webConfig.init();
  let statuscakeScraper: StatuscakeScraper = new StatuscakeScraper(statuscakeClient);

  setInterval(() => {
    let startTime = Date.now();
    statuscakeScraper.scrape();
  }, 30000);
  statuscakeScraper.scrape();

})().catch(e => winston.error(e));
