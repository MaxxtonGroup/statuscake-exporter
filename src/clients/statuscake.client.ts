import * as request from "request";
import { Observable } from "rxjs/Observable";
import * as winston from "winston";
import { StatuscakeConfig } from "../config/statuscake.config";
import { StatusCakeTest } from "../domain/test.domain";

/**
 * Statuscake client, responsible for calling their api
 *
 * @author R. Sonke <r.sonke@maxxton.com>
 */
export class StatuscakeClient {

  constructor(private statuscakeConfig: StatuscakeConfig) {
  }

  /**
   * Get all tests
   *
   * @returns {Promise<StatusCakeTest[]>}
   */
  public getTests(): Observable<StatusCakeTest[]> {
    let options = {
      uri: "https://app.statuscake.com/API/Tests/",
      headers: {
        Username: this.statuscakeConfig.username,
        API: this.statuscakeConfig.apiKey
      },
      json: true
    };

    return Observable.create(observer => {
      request.get(options, (error, response, body) => {
        if (error == null) {
          observer.next(body);
          observer.complete();
        } else {
          observer.error(error);
        }
      });
    });
  }

}
