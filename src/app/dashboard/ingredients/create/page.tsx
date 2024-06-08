"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from 'react-spinners';
import CustomInput from '@/components/myInput.components';

interface IIngredientFormValues {
  name: string;
  picture: string;
  labelDosage: string;
  dosage: string;
}

function CreateIngredient() {
    const { register, handleSubmit } = useForm<IIngredientFormValues>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<IIngredientFormValues> = async (data, event) => {
        event?.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Ingredient created:", data);
            setTimeout(() => {
                window.location.href = '/dashboard/ingredients';
            }, 2000);
        } catch (error) {
            console.error("Error creating ingredient:", error);
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex items-center justify-center px-4 py-auto sm:px-6 lg:px-8">
            <div className="w-full space-y-8">
                <div className="bg-white m-auto w-4/12 shadow-lg rounded-md p-6">
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create a New Ingredient
                    </h2>
                    <form className="space-y-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput<IIngredientFormValues>
                            label="name"
                            type='text'
                            register={register}
                            required={true}
                        />
                        <CustomInput<IIngredientFormValues>
                            label="picture"
                            type='text'
                            register={register}
                            required={true}
                        />
                        <CustomInput<IIngredientFormValues>
                            label="labelDosage"
                            type='text'
                            register={register}
                            required={true}
                        />
                        <CustomInput<IIngredientFormValues>
                            label="dosage"
                            type='text'
                            register={register}
                            required={true}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? <ClipLoader color="#fff" size={20} /> : 'Create Ingredient'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateIngredient;
