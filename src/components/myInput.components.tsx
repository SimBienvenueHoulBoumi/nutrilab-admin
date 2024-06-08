import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
    label: Path<T>;
    type: string;
    register: UseFormRegister<T>;
    required: boolean;
}

const CustomInput = <T extends FieldValues>({ label, type, register, required }: CustomInputProps<T>) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            {...register(label, { required })}
            className="input input-bordered w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
    </div>
);

export default CustomInput;
