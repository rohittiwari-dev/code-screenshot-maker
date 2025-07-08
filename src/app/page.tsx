import { findSharableLinkById } from "@/actions";
import Footer from "@/components/Footer";
import { getBaseUrl } from "@/lib/base-url";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const MainPageComponent = dynamic(
	() => import("@/components/MainPageComponent"),
);

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
	searchParams,
}: Props): Promise<Metadata> {
	const { t } = await searchParams;
	const shareId = t?.toString();

	if (!shareId) {
		return {
			title: "CodeShare - Beautiful Code Screenshots",
			description:
				"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options.",
		};
	}

	const result = await findSharableLinkById(shareId);
	const sharedData = result?.data;

	if (!sharedData) {
		return {
			title: "CodeShare - Beautiful Code Screenshots",
			description:
				"Transform your code snippets into stunning, shareable images with customizable themes, fonts, and styling options.",
		};
	}

	const title = `${sharedData.title} - CodeShare`;
	const description = `Check out this ${sharedData.language} code snippet: "${sharedData.title}". Created with CodeShare - Beautiful Code Screenshots.`;
	const baseUrl = getBaseUrl();
	const url = `${baseUrl}?t=${shareId}`;
	const thumbnailUrl = `${baseUrl}/thumbnail.png`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: "website",
			images: [
				{
					url: thumbnailUrl,
					width: 1200,
					height: 630,
					alt: `${sharedData.title} - Code Screenshot`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [thumbnailUrl],
		},
	};
}

async function HomePage({ searchParams }: Props) {
	const { t } = await searchParams;
	const state = await findSharableLinkById(t?.toString() || "");

	return (
		<main className="flex flex-col w-screen h-screen">
			<MainPageComponent state={state?.data} />
			{/* Footer Component */}
			<Footer />
		</main>
	);
}

export default HomePage;
