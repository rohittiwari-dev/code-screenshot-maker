export function getBaseUrl() {
	if (typeof window !== "undefined") {
		// Browser should use relative url
		return "";
	}

	// SSR should use the environment variable or fallback
	if (process.env.NEXT_PUBLIC_BASE_URL) {
		return process.env.NEXT_PUBLIC_BASE_URL;
	}

	// Fallback for development
	if (process.env.NODE_ENV === "development") {
		return "http://localhost:3000";
	}

	// Production fallback
	return "https://codeshare.dev";
}
