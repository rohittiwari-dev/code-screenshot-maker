import { cn } from "@/lib/utils";

interface PropType {
	width: string;
	showWidth: boolean;
}

const WriteTextResize = ({ width, showWidth }: PropType) => {
	return (
		<div
			className={cn(
				"w-full flex gap-2 items-center text-white transition-opacity",
				showWidth ? "visible opacity-100" : "invisible opacity-0",
			)}
		>
			<div className="flex flex-1 items-center">
				<div className="bg-white/20 w-0.5 h-4" />
				<div className="bg-white/20 w-full h-px" />
			</div>
			<span className="text-neutral-500 text-sm">{width} px</span>
			<div className="flex flex-1 items-center">
				<div className="bg-white/20 w-full h-px" />
				<div className="bg-white/20 w-0.5 h-4" />
			</div>
		</div>
	);
};

export default WriteTextResize;
