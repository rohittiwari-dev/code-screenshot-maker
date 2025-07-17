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
			useStore.setState({
				language: language.toLowerCase() || "plaintext",
			});
		}
	}, [store.autoDetectLanguage, store.code]);

	return (
		<div
			className={cn(
				"min-w-[300px] min-h-[200px] border-2 rounded-xl shadow-2xl",
				store.darkMode
					? "bg-black/75 border-gray-600/40"
					: "bg-white/75 border-gray-200/20",
			)}
		>
			<header className="items-center gap-3 grid grid-cols-6 px-4 py-3">
				<div className="flex gap-1 5">
					<div className="bg-red-500 rounded-full w-3 h-3" />
					<div className="bg-yellow-500 rounded-full w-3 h-3" />
					<div className="bg-green-500 rounded-full w-3 h-3" />
				</div>
				<div className="flex justify-center col-span-4">
					<label htmlFor="title" className="sr-only">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						value={store.title}
						onChange={(e) =>
							useStore.setState({ title: e.target.value })
						}
						spellCheck={false}
						onClick={(e) => e.currentTarget.select()}
						className="flex-1 bg-transparent font-medium text-center text-gray-400 text-sm focus:outline-none"
					/>
				</div>
			</header>
			<div
				className={cn(
					"px-4 pb-4",
					store.darkMode
						? "brightness-110"
						: "text-gray-800 brightness-50 saturate-200 contrast-200",
				)}
			>
				<label htmlFor="code-editor" className="sr-only">
					Code Editor
				</label>
				<Editor
					value={store.code}
					onValueChange={(code) => useStore.setState({ code: code })}
					highlight={(code) =>
						hljs.highlight(code, {
							language: store.language || "plaintext",
						}).value
					}
					padding={10}
					style={{
						fontFamily: Object.create(fonts)[store.fontStyle].name,
						fontSize: store.fontSize,
						minHeight: "120px",
						lineHeight: "1.5",
					}}
					textareaClassName="focus:outline-none min-w-[280px] resize-none"
					onClick={
						store.isEditorContentCompleteSelectable
							? (e) => {
									(
										e.currentTarget as HTMLTextAreaElement
									).select();
							  }
							: undefined
					}
					name="code-editor"
					id="code-editor"
					aria-label="Code Editor"
					textareaId="code-editor-textarea"
				/>
			</div>
		</div>
	);
};

export default CodeEditor;
