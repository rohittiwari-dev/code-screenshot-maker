import { useEffect, useRef, useState } from "react";
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
import WriteTextResize from "./components/WriteTextResize";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";

function App() {
	// Creating state
	const [width, setWidth] = useState("auto");
	const [showWidth, setShowWidth] = useState(false);

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
		<>
			<main className="dark overflow-x-hidden p-2 min-h-screen justify-center flex-col flex bg-neutral-950 items-center text-white">
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
					onResize={(_e, _dir, ref) => setWidth(ref.offsetWidth.toString())}
					onResizeStart={() => setShowWidth(true)}
					onResizeStop={() => setShowWidth(false)}
				>
					<WriteTextResize showWidth={showWidth} width={width} />
					<div
						className={cn(
							"transition-all my-1 ease-out",
							showBackground
								? Object.create(themes)[theme].background
								: "ring ring-neutral-900"
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
								: "visible opacity-100"
						)}
					>
						<Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
							<ResetIcon className="mr-2" />
							Reset width
						</Button>
					</div>
				</Resizable>
				<Card className="md:fixed bottom-16 py-2 px-4 mx-auto bg-neutral-900/80 shadow-lg backdrop-blur">
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
			<Footer />
		</>
	);
}

export default App;
