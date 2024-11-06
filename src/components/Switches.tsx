import useStore from "@/utils/state-store";
import { Switch } from "./ui/switch";

export const DarkModeSwitch = () => {
	return (
		<div>
			<label className="block mb-2 font-medium text-neutral-400 text-sm">
				Dark Mode
			</label>
			<Switch
				className="data-[state=checked]:bg-cyan-400"
				checked={useStore((state) => state.darkMode)}
				onCheckedChange={(checked) =>
					useStore.setState({ darkMode: checked })
				}
			/>
		</div>
	);
};

export const TransparentBackgroundSwitch = () => {
	return (
		<div>
			<label className="block mb-2 font-medium text-neutral-400 text-sm">
				Background
			</label>
			<Switch
				className="data-[state=checked]:bg-cyan-400"
				checked={useStore((state) => state.showBackground)}
				onCheckedChange={(checked) =>
					useStore.setState({ showBackground: checked })
				}
			/>
		</div>
	);
};
