import { Settings } from "./settings";

export class StatuscakeConfig {

  public readonly username: string;
  public readonly apiKey: string;

  constructor() {
    this.username = Settings.get("STATUSCAKE_USERNAME");
    this.apiKey = Settings.get("STATUSCAKE_API_KEY");
  }

}
