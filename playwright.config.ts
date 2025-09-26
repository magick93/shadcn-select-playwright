import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 5173,
		reuseExistingServer: true
	},
	testDir: 'e2e'
});
