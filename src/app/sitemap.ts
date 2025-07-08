import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl();

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
	];
}
