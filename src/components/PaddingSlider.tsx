import useStore from "@/utils/state-store";
import { Slider } from "./ui/slider";

const PaddingSlider = () => {
	return (
		<div>
			<label className="block mb-2 font-medium text-neutral-400 text-sm">
				Padding
			</label>
			<Slider
				className="my-5 w-44"
				value={[useStore((state) => state.padding)]}
				onValueChange={([padding]) => useStore.setState({ padding })}
				max={120}
				step={8}
			/>
		</div>
	);
};

export default PaddingSlider;
