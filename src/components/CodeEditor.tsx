import { cn } from "@/lib/utils";
import { codeSnippets, fonts } from "@/utils/configuration";
import Editor from "react-simple-code-editor";
import { useEffect } from "react";
import hljs from "highlight.js";
import useStore from "@/utils/state-store";
import flourite from "flourite";

const CodeEditor = () => {
	// getting store
	const store = useStore();

	// Generating Rancdom Snipettes at Reload
	useEffect(() => {
		const randomSnipettes =
			Object.create(codeSnippets)[
				Math.floor(Math.random() * codeSnippets.length)
			];
		useStore.setState({ ...randomSnipettes });
	}, []);

	// Auto Detection of Language
	useEffect(() => {
		if (store.autoDetectLanguage) {
			const { language } = flourite(store.code, { noUnknown: true });
			useStore.setState({ language: language.toLowerCase() || "plaintext" });
		}
	}, [store.autoDetectLanguage, store.code]);

	return (
		<div
			className={cn(
				"min-w-fit border-2 rounded-xl shadow-2xl",
				store.darkMode
					? "bg-black/75 border-gray-600/40"
					: "bg-white/75 border-gray-200/20"
			)}
		>
			<header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
				<div className="flex gap-1 5">
					<div className="rounded-full h-3 w-3 bg-red-500" />
					<div className="rounded-full h-3 w-3 bg-yellow-500" />
					<div className="rounded-full h-3 w-3 bg-green-500" />
				</div>
				<div className="col-span-4 flex justify-center">
					<input
						type="text"
						name="title"
						id="title"
						value={store.title}
						onChange={(e) => useStore.setState({ title: e.target.value })}
						spellCheck={false}
						onClick={(e) => e.currentTarget.select()}
						className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
					/>
				</div>
			</header>
			<div
				className={cn(
					"px-4 pb-4",
					store.darkMode
						? "brightness-110"
						: "text-gray-800 brightness-50 saturate-200 contrast-200"
				)}
			>
				<Editor
					value={store.code}
					onValueChange={(code) => useStore.setState({ code: code })}
					highlight={(code) =>
						hljs.highlight(code, { language: store.language || "plaintext" })
							.value
					}
					padding={10}
					style={{
						fontFamily: Object.create(fonts)[store.fontStyle].name,
						fontSize: store.fontSize,
					}}
					textareaClassName="focus:outline-none min-w-fit"
					// @ts-expect-error Line Conisists of Refereance variable of type HTMLElement | null
					onClick={(e) => e.currentTarget.select()}
				/>
			</div>
		</div>
	);
};

export default CodeEditor;
