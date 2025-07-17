import { Loader2Icon } from "lucide-react";
import React from "react";

const LoadingPage = () => {
	return (
		<div className="w-screen dark h-screen flex items-center justify-center ">
			<div className="flex items-center justify-center w-8 h-8">
				<Loader2Icon className="size-8 animate-spin duration-500 text-purple-600" />
			</div>
		</div>
	);
};

export default LoadingPage;
