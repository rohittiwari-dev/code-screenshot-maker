import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { toBlob, toPng, toSvg } from "html-to-image";
import useStore from "@/utils/state-store";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import {
	IconCapture,
	IconCopy,
	IconDownload,
	IconLink,
	IconShare2,
} from "@tabler/icons-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { createSharableLink } from "@/actions";

const ExportButton = ({
	targetRef,
}: {
	targetRef: React.RefObject<HTMLDivElement | null>;
}) => {
	const [showDialog, setShowDialog] = useState(false);
	const [sharableLink, setSharableLink] = useState("");
	// getting Title from State
	const title = useStore((state) => state.title);

	// Copy Image Function Declaration
	const copyImage = () => {
		const response = async () => {
			if (targetRef?.current) {
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
	const generateLink = async () => {
		const state = useStore.getState();

		const storedData = await createSharableLink({
			code: state.code,
			title: state.title,
			theme: state.theme,
			darkMode: state.darkMode,
			showBackground: state.showBackground,
			fontSize: state.fontSize,
			fontStyle: state.fontStyle,
			language: state.language,
			autoDetectLanguage: state.autoDetectLanguage,
			padding: state.padding,
		});

		// Generate final URL with compressed state
		if (storedData.data) {
			const link = `${location?.origin}${location?.pathname}?t=${storedData.data?.id}`;
			setSharableLink(link);
		} else {
			setSharableLink("Failed to generate link");
			throw new Error(
				"Failed to generate sharable link: " + storedData.msg,
			);
		}
		setShowDialog(true);
	};

	// Save Image Function
	const saveImage = async (name: string, format: string) => {
		const response = async (name: string, format: string) => {
			let imgUrl = "",
				filename = name;
			if (targetRef?.current)
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
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button name="export-button" aria-label="Export Screenshot">
						<IconShare2 className="mr-2" /> Export
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="dark">
					<DropdownMenuItem onClick={copyImage} className="gap-2">
						<IconCapture />
						Copy Image
						<DropdownMenuShortcut>⌘c</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="gap-2"
						onClick={() =>
							toast.promise(generateLink(), {
								loading: "Generating Link...",
								success: "Link Generated Successfully",
								error: "Failed to generate link..",
							})
						}
					>
						<IconLink />
						Copy Link
						<DropdownMenuShortcut>⇧c</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="gap-2"
						onClick={() => saveImage(title, "PNG")}
					>
						<IconDownload />
						Copy PNG
						<DropdownMenuShortcut>⇧s</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => saveImage(title, "SVG")}
						className="gap-2"
					>
						<IconDownload />
						Copy SVG
						<DropdownMenuShortcut>⌘⇧s</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog modal open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className="flex flex-col gap-4 items-center">
					<DialogTitle>Shareable Link</DialogTitle>
					<p className="text-sm text-muted-foreground text-center">
						Copy and share this link to let others view your
						screenshot.
					</p>
					<div className="w-full flex items-center gap-4 bg-muted rounded px-2 py-2">
						<label htmlFor="sharable-link-input">
							Sharable Link
						</label>
						<input
							type="text"
							readOnly
							className="flex-1 bg-transparent outline-none text-xs"
							value={sharableLink}
							onFocus={(e) => e.target.select()}
							aria-label="Sharable Link"
							name="sharable-link-input"
							id="sharable-link-input"
						/>
						<Button
							size="sm"
							onClick={() => {
								navigator.clipboard.writeText(sharableLink);
								toast.success("Link is copied to Clipboard");
								setShowDialog(false);
							}}
						>
							<IconCopy /> Copy
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ExportButton;
