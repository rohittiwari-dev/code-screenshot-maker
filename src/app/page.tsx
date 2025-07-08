import { findSharableLinkById } from "@/actions";
import Footer from "@/components/Footer";
import MainPageComponent from "@/components/MainPageComponent";

async function HomePage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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
