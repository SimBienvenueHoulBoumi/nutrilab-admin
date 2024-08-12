import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomInputProps<T extends FieldValues> {
  label: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  required: boolean;
}

const CustomInput = <T extends FieldValues>({
  label,
  type,
  register,
  required,
}: CustomInputProps<T>) => {
  const validatePositiveNumber = (value: any) => {
    if (type === "number" && value <= 0) {
      toast.error("Doses positive seulement");
      return false;
    }
    return true;
  };

  return (
    <div>
      <ToastContainer />
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(label, { required, validate: validatePositiveNumber })}
        className="input input-bordered w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default CustomInput;
