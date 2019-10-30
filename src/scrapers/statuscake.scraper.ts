import { Gauge } from "prom-client";
import * as winston from "winston";
import { StatuscakeClient } from "../clients/statuscake.client";
import { Settings } from "../config/settings";

/**
 * Statuscake scraper, populating the metrics
 *
 * @author R. Sonke <r.sonke@maxxton.com>
 */
export class StatuscakeScraper {

  private statuscakeUp: Gauge;
  private statuscakeUptime: Gauge;
  private statuscakePaused: Gauge;

  constructor(private statuscakeClient: StatuscakeClient) {

    this.statuscakeUp = new Gauge({
      name: "statuscake_up",
      help: "Is the website up?",
      labelNames: ["website", "testId", "name"]
    });

    this.statuscakeUptime = new Gauge({
      name: "statuscake_uptime_today",
      help: "One day percentage uptime for this website",
      labelNames: ["website", "testId", "name"]
    });

    this.statuscakePaused = new Gauge({
      name: "statuscake_paused",
      help: "Is the test paused?",
      labelNames: ["website", "testId", "name"]
    });
  }

  public async scrape(): Promise<void> {
    winston.info("Scrape Statuscake");

    this.statuscakeClient.getTests().subscribe(tests => {
      if (tests) {
        tests.forEach(test => {
          this.statuscakeUp.set({ website: test.WebsiteURL, testId: test.TestID, name: test.WebsiteName }, test.Status === "Up" ? 1 : 0);
          if (typeof test.Uptime === "number") {
            this.statuscakeUptime.set({ website: test.WebsiteURL, testId: test.TestID, name: test.WebsiteName }, test.Uptime);
          }
          this.statuscakePaused.set({ website: test.WebsiteURL, testId: test.TestID, name: test.WebsiteName }, test.Paused ? 1 : 0);
        });
      }
    });

  }
}
