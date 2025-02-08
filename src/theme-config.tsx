import { z } from 'zod';

// Validation schemas for theme configuration
const ThemeSchema = z.object({
  // THEMES
  theme: z.enum(['light', 'dark']).default('dark'),
  // DARK MODE
  isDarkMode: z.boolean().default(true),
});

// Dynamic theme configuration management
export class ThemeConfigManager {
  private static instance: ThemeConfigManager;
  private config: z.infer<typeof ThemeSchema>;

  private constructor() {
    // Initialize with stored or default configuration
    this.config = this.loadConfig();
    this.applyInitialConfig();
  }

  public static getInstance(): ThemeConfigManager {
    if (!ThemeConfigManager.instance) {
      ThemeConfigManager.instance = new ThemeConfigManager();
    }
    return ThemeConfigManager.instance;
  }

  private loadConfig() {
    try {
      const storedConfig = {
        theme: localStorage.getItem('theme'),
        isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      };

      return ThemeSchema.parse(storedConfig);
    } catch {
      return ThemeSchema.parse({});
    }
  }

  private applyInitialConfig() {
    // Apply dark mode
    if (this.config.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  public getConfig() {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<z.infer<typeof ThemeSchema>>) {
    const newConfig = { ...this.config, ...updates };
    const validatedConfig = ThemeSchema.parse(newConfig);

    // Update localStorage
    Object.entries(validatedConfig).forEach(([key, value]) => {
      localStorage.setItem(key, String(value));
    });

    // Update dark mode
    if (validatedConfig.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.config = validatedConfig;
    return this.config;
  }
}

export const themeConfig = ThemeConfigManager.getInstance();