//hooks
import { useState } from "react";

//icons
import { Eye, EyeOff } from "lucide-react";

//components
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const CustomInputGroup = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1">
      <Label htmlFor="email" className="text-secondary text-xs font-normal">
        {label}
      </Label>
      <InputGroup>
        <InputGroupInput
          type={showPassword ? "text" : type}
          id={id}
          placeholder={placeholder}
          className="w-full text-black"
          value={value}
          onChange={onChange}
          autoComplete="true"
        />
        <InputGroupAddon
          align="inline-end"
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default CustomInputGroup;
