import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getBaseUrl } from "@/lib/base-url";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
	title: {
		default: "CodeShare - Beautiful Code Screenshots",
		template: "%s | CodeShare",
	},
	description:
		"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options. Perfect for social media, documentation, and presentations.",
	keywords: [
		"code screenshots",
		"code sharing",
		"syntax highlighting",
		"code images",
		"programming",
		"developer tools",
		"code snippets",
		"social media",
		"github",
		"coding",
	],
	authors: [{ name: "CodeShare Team" }],
	creator: "CodeShare",
	publisher: "CodeShare",
	applicationName: "CodeShare",
	category: "Developer Tools",
	classification: "Developer Tools",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: baseUrl,
		siteName: "CodeShare",
		title: "CodeShare - Beautiful Code Screenshots",
		description:
			"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options.",
		images: [
			{
				url: `${baseUrl}/thumbnail.png`,
				width: 1200,
				height: 630,
				alt: "CodeShare - Beautiful Code Screenshots",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@codeshare",
		creator: "@codeshare",
		title: "CodeShare - Beautiful Code Screenshots",
		description:
			"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options.",
		images: [`${baseUrl}/thumbnail.png`],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/icon.png", sizes: "32x32", type: "image/png" },
			{ url: "/icon.png", sizes: "16x16", type: "image/png" },
		],
		apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
		other: [
			{
				rel: "apple-touch-icon-precomposed",
				url: "/icon.png",
			},
		],
	},
	manifest: "/manifest.json",
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},
	verification: {
		// Add your verification codes here when you have them
		// google: "your-google-verification-code",
		// yandex: "your-yandex-verification-code",
		// yahoo: "your-yahoo-verification-code",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "CodeShare",
		description:
			"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options.",
		url: baseUrl,
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Web",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		creator: {
			"@type": "Organization",
			name: "CodeShare Team",
		},
		featureList: [
			"Beautiful Code Highlighting",
			"Customizable Themes",
			"Multiple Font Options",
			"Export as Images",
			"Social Media Sharing",
		],
	};

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
