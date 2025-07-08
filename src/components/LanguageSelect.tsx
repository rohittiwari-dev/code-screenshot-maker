import useStore from "@/utils/state-store";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { languages } from "@/utils/configuration";
import { toast } from "sonner";
import { IconWand } from "@tabler/icons-react";
const LanguageSelect = () => {
	// getting States
	const language = useStore((state) => state.language);
	const autoDetectLanguage = useStore((state) => state.autoDetectLanguage);

	const handleChange = (language: string) => {
		if (language === "auto-detect") {
			toast.dismiss();
			toast.success("Language Auto Detection Feature Turned On..");
			useStore.setState({
				autoDetectLanguage: true,
				language: "plaintext",
			});
		} else {
			useStore.setState({ autoDetectLanguage: false, language });
		}
	};

	return (
		<div>
			<label className="block mb-2 font-medium text-neutral-400 text-sm">
				Language
			</label>
			<Select value={language} onValueChange={handleChange}>
				<SelectTrigger className="w-40">
					{autoDetectLanguage && <IconWand className="mr2" />}
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="max-h-[300px] dark">
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
						},
					)}
				</SelectContent>
			</Select>
		</div>
	);
};

export default LanguageSelect;
