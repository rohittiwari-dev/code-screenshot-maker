import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
	persist(
		() => ({
			code: "",
			title: "Untitled",
			theme: "sublime",
			darkMode: true,
			showBackground: true,
			language: "plaintext",
			autoDetectLanguage: false,
			fontSize: 18,
			fontStyle: "jetBrainsMono",
			padding: 64,
			isEditorContentCompleteSelectable: false,
		}),
		{
			name: "user-preferance",
		},
	),
);
export default useStore;
