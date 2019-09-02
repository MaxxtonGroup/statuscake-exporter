import { register } from "prom-client";
import { Controller, Get } from "routing-controllers";

/**
 * Metrics HTTP controller
 * @author R. Sonke <r.sonke@maxxton.com>
 */
@Controller()
export class MetricsController {

  /**
   * Get Prometheus metrics
   * @returns {string}
   */
  @Get("/metrics")
  public getMetrics(): string {
    return register.metrics();
  }

  /**
   * Get Health status
   * @returns {string}
   */
  @Get("/health")
  public getHealth(): string {
    return "ok";
  }

}
