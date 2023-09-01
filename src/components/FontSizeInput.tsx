import useStore from "@/utils/state-store";
import { Input } from "./ui/input";

const FontSizeInput = () => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-neutral-400">
				Font Size
			</label>
			<Input
				type="number"
				className="!dark bg-transparent w-16"
				value={useStore((state) => state.fontSize)}
				onChange={(e) =>
					useStore.setState({ fontSize: Number(e.target.value) })
				}
			/>
		</div>
	);
};

export default FontSizeInput;
