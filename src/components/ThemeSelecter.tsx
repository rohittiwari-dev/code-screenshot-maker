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
			<label className="block mb-2 font-medium text-neutral-400 text-sm">
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
				<SelectContent className="max-h-[300px] dark">
					{Object.entries(themes).map(
						([name, theme]: [
							string,
							{ background: string; theme: string },
						]) => {
							return (
								<SelectItem key={name} value={name}>
									<div className="flex justify-start items-center gap-2">
										<span
											className={cn(
												"rounded-full w-4 h-4",
												theme.background,
											)}
										/>
										<span className="capitalize">
											{name}
										</span>
									</div>
								</SelectItem>
							);
						},
					)}
				</SelectContent>
			</Select>
		</div>
	);
};

export default ThemeSelecter;
