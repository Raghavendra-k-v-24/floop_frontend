//components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CustomInput = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <Label htmlFor="email" className="text-secondary text-xs font-normal">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full text-black"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
