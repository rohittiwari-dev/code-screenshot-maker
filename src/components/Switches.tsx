import useStore from "@/utils/state-store";
import { Switch } from "./ui/switch";

export const DarkModeSwitch = () => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-neutral-400">
				Dark Mode
			</label>
			<Switch
				checked={useStore((state) => state.darkMode)}
				onCheckedChange={(checked) => useStore.setState({ darkMode: checked })}
			/>
		</div>
	);
};

export const TransparentBackgroundSwitch = () => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-neutral-400">
				Background
			</label>
			<Switch
				checked={useStore((state) => state.showBackground)}
				onCheckedChange={(checked) =>
					useStore.setState({ showBackground: checked })
				}
			/>
		</div>
	);
};
