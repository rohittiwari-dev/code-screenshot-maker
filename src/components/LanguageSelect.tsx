import useStore from "@/utils/state-store";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { languages } from "@/utils/configuration";
import { MagicWandIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const LanguageSelect = () => {
	// getting States
	const language = useStore((state) => state.language);
	const autoDetectLanguage = useStore((state) => state.autoDetectLanguage);

	const handleChange = (language: string) => {
		if (language === "auto-detect") {
			toast.dismiss();
			toast.success("Language Auto Detection Feature Turned On..");
			useStore.setState({ autoDetectLanguage: true, language: "plaintext" });
		} else {
			useStore.setState({ autoDetectLanguage: false, language });
		}
	};

	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-neutral-400">
				Language
			</label>
			<Select value={language} onValueChange={handleChange}>
				<SelectTrigger className="w-40">
					{autoDetectLanguage && <MagicWandIcon className="mr2" />}
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="dark h-[500px]">
					<SelectItem key={"auto-detect"} value={"auto-detect"}>
						<span className="capitalize">auto detect</span>
					</SelectItem>
					{Object.entries(languages).map(
						([language, extention]: [string, string]) => {
							return (
								<SelectItem key={language} value={language}>
									<span>{extention}</span>
								</SelectItem>
							);
						}
					)}
				</SelectContent>
			</Select>
		</div>
	);
};

export default LanguageSelect;
