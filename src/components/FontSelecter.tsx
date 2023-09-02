import useStore from "@/utils/state-store";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { fonts } from "@/utils/configuration";

const FontSelecter = () => {
	return (
		<div>
			<div>
				<label className="block mb-2 text-sm font-medium text-neutral-400">
					Theme
				</label>
				<Select
					value={useStore((state) => state.fontStyle)}
					onValueChange={(e) => {
						useStore.setState({ fontStyle: e });
					}}
				>
					<SelectTrigger className="w-40">
						<SelectValue />
					</SelectTrigger>
					<SelectContent className="dark max-h-[300px]">
						{Object.entries(fonts).map(
							([name, font]: [string, { name: string; src: string }]) => {
								return (
									<SelectItem key={name} value={name}>
										<div className="flex gap-2 items-center justify-start">
											<span className="capitalize">{font.name}</span>
										</div>
									</SelectItem>
								);
							}
						)}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default FontSelecter;
