import { themes } from "@/utils/configuration";
import {
	SelectContent,
	SelectValue,
	Select,
	SelectItem,
	SelectTrigger,
} from "./ui/select";
import { cn } from "@/lib/utils";
import useStore from "@/utils/state-store";

const ThemeSelecter = () => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-neutral-400">
				Theme
			</label>
			<Select
				value={useStore((state) => state.theme)}
				onValueChange={(e) => {
					useStore.setState({ theme: e });
				}}
			>
				<SelectTrigger className="w-40">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="dark max-h-[300px]">
					{Object.entries(themes).map(
						([name, theme]: [
							string,
							{ background: string; theme: string }
						]) => {
							return (
								<SelectItem key={name} value={name}>
									<div className="flex gap-2 items-center justify-start">
										<span
											className={cn("rounded-full w-4 h-4", theme.background)}
										/>
										<span className="capitalize">{name}</span>
									</div>
								</SelectItem>
							);
						}
					)}
				</SelectContent>
			</Select>
		</div>
	);
};

export default ThemeSelecter;
