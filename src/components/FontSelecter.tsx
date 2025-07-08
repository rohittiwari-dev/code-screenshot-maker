import useStore from "@/utils/state-store";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { fonts } from "@/utils/configuration";

const FontSelector = () => {
	return (
		<div>
			<div>
				<label className="block mb-2 font-medium text-neutral-400 text-sm">
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
					<SelectContent className="max-h-[300px] dark">
						{Object.entries(fonts).map(
							([name, font]: [
								string,
								{ name: string; src: string },
							]) => {
								return (
									<SelectItem key={name} value={name}>
										<div className="flex justify-start items-center gap-2">
											<span className="capitalize">
												{font.name}
											</span>
										</div>
									</SelectItem>
								);
							},
						)}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default FontSelector;
