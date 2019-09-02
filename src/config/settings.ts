import * as fs from "fs";
import * as jsyaml from "js-yaml";
import * as winston from "winston";

/**
 * Statuscake settings
 *
 * @author R. Sonke <r.sonke@maxxton.com>
 */
export class Settings {

  public static get<T>(key: string, defaultValue?: T): T {
    let value: T = Settings.getFromEnv(key);
    if (value) {
      return value;
    }
    return defaultValue;
  }

  public static getString(key: string, defaultValue?: string): string {
    return Settings.get<string>(key, defaultValue);
  }

  private static getFromEnv(key: string): any {
    return process.env[key.replace(/\./g, "_").toUpperCase()];
  }
}
