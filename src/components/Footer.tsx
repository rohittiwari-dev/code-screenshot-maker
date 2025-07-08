import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bottom-0 sticky flex sm:flex-row flex-col justify-between items-center bg-neutral-950 px-2 md:px-24 lg:px-32 py-4 pb-8 w-full h-fit font-medium text-gray-400 dark">
			<div className="flex">
				<Image
					className="mr-2"
					src={"/logo.png"}
					alt="logo"
					width={20}
					height={20}
				/>
				<a
					href="https://rohitdev.netlify.app"
					rel="noopener norefferer"
					className="underline"
				>
					Rohit Tiwari
				</a>
			</div>
			<a
				href="https://rohitdev.netlify.app/contact"
				rel="noopener norefferer"
				className="underline"
			>
				&copy; Rohit Tiwari for fun 😉 | Give Feedback
			</a>
		</footer>
	);
};
export default Footer;
