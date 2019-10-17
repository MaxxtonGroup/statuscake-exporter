
/**
 * Statuscake test domain interface
 *
 * @author R. Sonke <r.sonke@maxxton.com>
 */
export interface StatusCakeTest {
  WebsiteName: string;
  WebsiteURL: string;
  TestID: string;
  Status: string;
  Uptime: number;
  Paused: boolean;
}
