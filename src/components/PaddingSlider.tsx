import useStore from "@/utils/state-store";
import { Slider } from "./ui/slider";

const PaddingSlider = () => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-neutral-400">
				Font Size
			</label>
			<Slider
				className="w-44 my-5"
				value={[useStore((state) => state.padding)]}
				onValueChange={([padding]) => useStore.setState({ padding })}
				max={120}
				step={8}
			/>
		</div>
	);
};

export default PaddingSlider;
