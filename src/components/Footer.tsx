const Footer = () => {
	return (
		<footer className=" flex-col sm:flex-row px-2 md:px-24 lg:px-32 py-6 pb-12 dark bg-neutral-950 text-gray-400 font-medium w-full  h-fit flex items-center justify-between">
			<div className="flex">
				<img
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
