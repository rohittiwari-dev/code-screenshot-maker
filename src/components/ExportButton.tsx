import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
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
import { useHotkeys } from "react-hotkeys-hook";
import { compressToEncodedURIComponent } from "lz-string";

const ExportButton = ({
	targetRef,
}: {
	targetRef: React.RefObject<HTMLElement>;
}) => {
	// getting Title from State
	const title = useStore((state) => state.title);

	// Copy Image Function Declaration
	const copyImage = () => {
		const response = async () => {
			if (targetRef.current) {
				const imgBlob = await toBlob(targetRef.current, {
					pixelRatio: 2,
				});
				const img = new ClipboardItem({ "image/png": imgBlob || "" });
				navigator.clipboard.write([img]);
			} else navigator.clipboard.writeText("Something Went Wrong");
		};

		toast.promise(response(), {
			loading: "Copying...",
			success: "Image Copyied to Clipbord..",
			error: "Something Went Wrong..",
		});
	};
	// Generate Screenshot Link to the Portal Function
	const generateLink = () => {
		const state = useStore.getState();
		// Compress the entire state object to reduce URL length
		const compressedState = compressToEncodedURIComponent(
			JSON.stringify(state),
		);
		// Generate final URL with compressed state
		const link = `${location.origin}${location.pathname}?state=${compressedState}`;
		navigator.clipboard.writeText(link);
		toast.success("Link is copied to Clipboard");
	};

	// Save Image Function
	const saveImage = async (name: string, format: string) => {
		const response = async (name: string, format: string) => {
			let imgUrl = "",
				filename = name;
			if (targetRef.current)
				switch (format.toLowerCase()) {
					case "png":
						imgUrl = await toPng(targetRef.current, {
							pixelRatio: 2,
						});
						filename = `${filename}.png`;
						break;
					case "svg":
						imgUrl = await toSvg(targetRef.current, {
							pixelRatio: 2,
						});
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
		if (format === "PNG")
			toast.promise(response(name, format), {
				loading: "Copying...",
				success: "PNG Image Downloaded",
				error: "Something Went Wrong..",
			});
		else
			toast.promise(response(title, "SVG"), {
				loading: "Copying...",
				success: "SVG Image Downloaded",
				error: "Something Went Wrong..",
			});
	};
	// Hot Keys Declaration
	useHotkeys("ctrl+c", copyImage);
	useHotkeys("shift+c", generateLink);
	useHotkeys("shift+s", () => saveImage(title, "PNG"));
	useHotkeys("ctrl+shift+s", () => saveImage(title, "SVG"));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<Share2Icon className="mr-2" /> Export
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="dark">
				<DropdownMenuItem onClick={copyImage} className="gap-2">
					<ImageIcon />
					Copy Image
					<DropdownMenuShortcut>⌘c</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={generateLink} className="gap-2">
					<Link2Icon />
					Copy Link
					<DropdownMenuShortcut>⇧c</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="gap-2"
					onClick={() => saveImage(title, "PNG")}
				>
					<DownloadIcon />
					Copy PNG
					<DropdownMenuShortcut>⇧s</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => saveImage(title, "SVG")}
					className="gap-2"
				>
					<DownloadIcon />
					Copy SVG
					<DropdownMenuShortcut>⌘⇧s</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ExportButton;
