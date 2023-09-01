import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
	DownloadIcon,
	ImageIcon,
	Link2Icon,
	Share2Icon,
} from "@radix-ui/react-icons";
import { toBlob, toPng, toSvg } from "html-to-image";
import { toast } from "react-hot-toast";
import useStore from "@/utils/state-store";

const ExportButton = ({
	targetRef,
}: {
	targetRef: React.RefObject<HTMLElement>;
}) => {
	// getting Title from State
	const title = useStore((state) => state.title);

	// Copy Image Function Declaration
	const copyImage = async () => {
		if (targetRef.current) {
			const imgBlob = await toBlob(targetRef.current, { pixelRatio: 2 });
			const img = new ClipboardItem({ "image/png": imgBlob || "" });
			navigator.clipboard.write([img]);
		} else navigator.clipboard.writeText("Something Went Wrong");
	};
	// Generate Screensot Link to the Portal Funtion
	const generateLink = () => {
		const state = useStore.getState();
		const paramObject = new Map<string, string>();
		for (let i = 0; i < Object.keys(state).length; i++) {
			paramObject.set(
				Object.keys(state)[i],
				Object.values(state)[i].toString()
			);
			if (Object.keys(state)[i] == "code")
				paramObject.set(
					Object.keys(state)[i],
					btoa(Object.values(state)[i].toString())
				);
		}
		const queryParams = new URLSearchParams([...paramObject]).toString();
		navigator.clipboard.writeText(`${location.href}?${queryParams}`);
	};

	// Save Image Function
	const saveImage = async (name: string, format: string) => {
		let imgUrl = "",
			filename = name;
		if (targetRef.current)
			switch (format.toLowerCase()) {
				case "png":
					imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
					filename = `${filename}.png`;
					break;
				case "svg":
					imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
					filename = `${filename}.svg`;
					break;
				default:
					break;
			}
		const a = document.createElement("a");
		a.href = imgUrl;
		a.download = filename;
		a.click();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<Share2Icon className="mr-2" /> Export
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="dark">
				<DropdownMenuItem
					onClick={() =>
						toast.promise(copyImage(), {
							loading: "Copying...",
							success: "Image Copyied to Clipbord..",
							error: "Something Went Wrong..",
						})
					}
					className="gap-2"
				>
					<ImageIcon />
					Copy Image
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						generateLink();
						toast.success("Link is copyied to Clipboard");
					}}
					className="gap-2"
				>
					<Link2Icon />
					Copy Link
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="gap-2"
					onClick={() =>
						toast.promise(saveImage(title, "PNG"), {
							loading: "Copying...",
							success: "PNG Image Downloaded",
							error: "Something Went Wrong..",
						})
					}
				>
					<DownloadIcon />
					Copy PNG
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						toast.promise(saveImage(title, "SVG"), {
							loading: "Copying...",
							success: "SVG Image Downloaded",
							error: "Something Went Wrong..",
						})
					}
					className="gap-2"
				>
					<DownloadIcon />
					Copy SVG
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ExportButton;
