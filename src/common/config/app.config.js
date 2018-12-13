import productionConfigs from './env/dev.json';
import developmentConfigs from './env/prod.json';

/**
 * Load the environment configuration with specific environment such as production
 */
class Config {
  constructor() {
    // Load the environment configuration
    if (PROD) {
      this.config = productionConfigs;
    }
    this.config = developmentConfigs;
  }

  /**
     * Get the current environment configuration object which is loaded in the load() function
     * @return {object}
     */
  getConfig() {
    return this.config;
  }

  /**
     * Get Default api endpoint
     * @returns {string} apiEndpoint
     */
  getDefaultApiEndpoint() {
    return this.config.apiEndpoint;
  }
}

export default new Config();
