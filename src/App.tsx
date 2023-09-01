import { useEffect, useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import { cn } from "./lib/utils";
import { fonts, themes } from "./utils/configuration";
import useStore from "./utils/state-store";
import { Card, CardContent } from "./components/ui/card";
import ExportButton from "./components/ExportButton";
import ThemeSelecter from "./components/ThemeSelecter";
import LanguageSelect from "./components/LanguageSelect";
import FontSelecter from "./components/FontSelecter";
import FontSizeInput from "./components/FontSizeInput";
import PaddingSlider from "./components/PaddingSlider";
import {
	DarkModeSwitch,
	TransparentBackgroundSwitch,
} from "./components/Switches";
import { Resizable } from "re-resizable";

function App() {
	const theme = useStore((state) => state.theme);
	const padding = useStore((state) => state.padding);
	const fontStyle = useStore((state) => state.fontStyle);
	const showBackground = useStore((state) => state.showBackground);
	const editorRef = useRef<HTMLDivElement | null>(null);

	// Handling Sharable links
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		if (queryParams.size === 0) return;
		const state = Object.fromEntries(queryParams);
		useStore.setState({
			...state,
			code: state.code ? atob(state.code) : "",
			darkMode: state.darkMode === "true",
			autoDetectLanguage: state.autoDetectLanguage === "true",
			padding: Number(state.padding || 64),
			fontSize: Number(state.fontSize || 18),
		});
	}, []);

	return (
		<main className="dark overflow-x-auto min-h-screen flex-col flex justify-center bg-neutral-950 items-center text-white">
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
			>
				<div
					className={cn(
						"overflow-hidden mb-2 transition-all ease-out",
						showBackground
							? Object.create(themes)[theme].background
							: "ring ring-neutral-900"
					)}
					style={{ padding }}
					ref={editorRef}
				>
					<CodeEditor />
				</div>
			</Resizable>
			<Card className="sm:fixed my-6  sm:my-0 bottom-16 py-6 px-8 mx-6 bg-neutral-900/80 shadow-lg backdrop-blur">
				<CardContent className="flex gap-6 flex-wrap p-0">
					<ThemeSelecter />
					<LanguageSelect />
					<FontSelecter />
					<FontSizeInput />
					<PaddingSlider />
					<TransparentBackgroundSwitch />
					<DarkModeSwitch />
					<div className="w-px bg-neutral-800" />
					<div className="place-self-center">
						<ExportButton targetRef={editorRef} />
					</div>
				</CardContent>
			</Card>
		</main>
	);
}

export default App;
