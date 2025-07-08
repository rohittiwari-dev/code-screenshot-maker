"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { themes, fonts } from "@/utils/configuration";
import dynamic from "next/dynamic";
import { Resizable } from "re-resizable";
import { IconRefresh } from "@tabler/icons-react";
import { sharableLinkDataTable } from "@/db/schema";
import { TransparentBackgroundSwitch, DarkModeSwitch } from "./Switches";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import useStore from "@/utils/state-store";
import ExportButton from "./ExportButton";
import FontSelecter from "./FontSelecter";
import FontSizeInput from "./FontSizeInput";
import LanguageSelect from "./LanguageSelect";
import PaddingSlider from "./PaddingSlider";

const ThemeSelecter = dynamic(() => import("./ThemeSelecter"), {
	ssr: false,
	loading: () => (
		<div className="w-24 h-8 bg-neutral-800 rounded animate-pulse" />
	),
});
const WriteTextResize = dynamic(() => import("./WriteTextResize"), {
	ssr: false,
	loading: () => <div className="h-4" />,
});
const CodeEditor = dynamic(() => import("./CodeEditor"), {
	ssr: false,
	loading: () => (
		<div className="min-w-fit border-2 rounded-xl shadow-2xl bg-black/75 border-gray-600/40">
			<div className="items-center gap-3 grid grid-cols-6 px-4 py-3">
				<div className="flex gap-1.5">
					<div className="bg-red-500 rounded-full w-3 h-3" />
					<div className="bg-yellow-500 rounded-full w-3 h-3" />
					<div className="bg-green-500 rounded-full w-3 h-3" />
				</div>
				<div className="flex justify-center col-span-4">
					<div className="bg-neutral-700 h-4 w-32 rounded animate-pulse" />
				</div>
			</div>
			<div className="px-4 pb-4">
				<div className="bg-neutral-700 h-32 w-full rounded animate-pulse" />
			</div>
		</div>
	),
});

const MainPageComponent = ({
	state,
}: {
	state?: typeof sharableLinkDataTable.$inferSelect | null;
}) => {
	// Creating state
	const [width, setWidth] = useState("auto");
	const [showWidth, setShowWidth] = useState(false);
	const theme = useStore((state) => state.theme);
	const padding = useStore((state) => state.padding);
	const fontStyle = useStore((state) => state.fontStyle);
	const showBackground = useStore((state) => state.showBackground);
	const editorRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (state) {
			if (state) {
				useStore.setState({
					theme: state.theme,
					padding: state.padding,
					fontStyle: state.fontStyle,
					showBackground: state.showBackground || false,
					autoDetectLanguage: state.autoDetectLanguage || false,
					code: state.code,
					darkMode: state.darkMode || false,
					fontSize: state.fontSize || 16,
					language: state.language || "plaintext",
					title: state.title || "Untitled",
				});
			}
		}
	}, [state]);

	return (
		<main className="flex flex-col flex-1 justify-around items-center bg-neutral-950 p-2 text-white overflow-x-hidden dark">
			<link
				rel="stylesheet"
				href={Object.create(themes)[theme].theme}
				crossOrigin="anonymous"
			/>
			<link
				rel="stylesheet"
				href={Object.create(fonts)[fontStyle].src}
				crossOrigin="anonymous"
			/>
			<Resizable
				enable={{ left: true, right: true }}
				minWidth={padding * 2 + 300}
				size={{ width, height: "auto" }}
				onResize={(_e, _dir, ref) =>
					setWidth(ref.offsetWidth.toString())
				}
				onResizeStart={() => setShowWidth(true)}
				onResizeStop={() => setShowWidth(false)}
				style={{ minHeight: "250px" }}
			>
				<WriteTextResize showWidth={showWidth} width={width} />
				<div
					className={cn(
						"transition-all my-1 ease-out",
						showBackground
							? Object.create(themes)[theme].background
							: "ring ring-neutral-900",
					)}
					style={{ padding }}
					ref={editorRef}
				>
					<CodeEditor />
				</div>
				<WriteTextResize showWidth={showWidth} width={width} />
				<div
					className={cn(
						"transition-opacity w-fit mx-auto -mt-4",
						showWidth || width === "auto"
							? "invisible opacity-0"
							: "visible opacity-100",
					)}
				>
					<Button
						size="sm"
						onClick={() => setWidth("auto")}
						variant="ghost"
						name="reset-width-button"
						aria-label="Reset Width"
					>
						<IconRefresh className="mr-2" />
						Reset width
					</Button>
				</div>
			</Resizable>
			<Card className="bottom-20 z-50 md:fixed bg-neutral-900/80 shadow-lg backdrop-blur mx-auto px-4 py-2">
				<CardContent className="flex flex-wrap gap-6 p-0">
					<ThemeSelecter />
					<LanguageSelect />
					<FontSelecter />
					<FontSizeInput />
					<PaddingSlider />
					<TransparentBackgroundSwitch />
					<DarkModeSwitch />
					<div className="bg-neutral-800 w-px" />
					<div className="place-self-center">
						<ExportButton targetRef={editorRef} />
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default MainPageComponent;
