import useStore from "@/utils/state-store";
import { Input } from "./ui/input";

const FontSizeInput = () => {
	return (
		<div>
			<label className="block mb-2 font-medium text-neutral-400 text-sm">
				Font Size
			</label>
			<Input
				type="number"
				className="bg-transparent w-16 !dark"
				value={useStore((state) => state.fontSize)}
				onChange={(e) =>
					useStore.setState({ fontSize: Number(e.target.value) })
				}
			/>
		</div>
	);
};

export default FontSizeInput;
