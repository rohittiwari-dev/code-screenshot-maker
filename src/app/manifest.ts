import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "CodeShare - Beautiful Code Screenshots",
		short_name: "CodeShare",
		description:
			"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options. Perfect for social media, documentation, and presentations.",
		start_url: "/",
		display: "standalone",
		background_color: "#000000",
		theme_color: "#000000",
		orientation: "portrait-primary",
		icons: [
			{
				src: "/icon.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
		],
		categories: ["developer", "productivity", "utilities"],
		lang: "en",
		dir: "ltr",
		scope: "/",
		id: "codeshare-app",
		shortcuts: [
			{
				name: "Create Screenshot",
				short_name: "Screenshot",
				description: "Create a new code screenshot",
				url: "/",
				icons: [{ src: "/icon.png", sizes: "192x192" }],
			},
		],
		screenshots: [
			{
				src: "/thumbnail.png",
				sizes: "1200x630",
				type: "image/png",
				form_factor: "wide",
				label: "CodeShare application screenshot",
			},
		],
	};
}
