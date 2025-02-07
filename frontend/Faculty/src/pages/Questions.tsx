import React, { useRef } from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useMainStore } from "../zustand/store";
import Config from "../../config.json";

import SelectGroupOne from "../components/Forms/SelectGroup/SelectGroupOne";

const schema = Joi.object({
  subject: Joi.string().label("Subject").required().messages({
    "any.required": "Subject is required"
  }),
  question: Joi.string().label("Question").required().messages({
    "any.required": "Question is required"
  }),
  correctAnswer: Joi.string().label("Correct Answer").required().messages({
    "any.required": "Correct answer is required"
  }),
  incorrectAnswer: Joi.string().label("Incorrect Answer").required().messages({
    "any.required": "Incorrect answer is required"
  })
});

const Questions: React.FC = () => {
  const user = useMainStore(state => state.user);

  const postData = async payload => {
    const response = await fetch(`${Config.serverOrigin}/questions/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error((await response.json()).message || "Internal Server Error");
    return response.json();
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: joiResolver(schema) });

  const {
    mutateAsync: addQuestion,
    isPending,
    error,
    data
  } = useMutation({
    mutationFn: postData
  });

  const onSubmit = async data => {
    try {
      addQuestion(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (data) console.log("Data");
  if (error) console.log("error");

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add New Question</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-col ">
              <SelectGroupOne register={register} error={errors.subject?.message} />
              <div className="">
                <label className="mb-2.5 block text-black dark:text-white">Question</label>
                <textarea
                  {...register("question")}
                  rows={5}
                  placeholder="Type your question..."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {errors.question && <p className="text-red-600 text-sm">{errors.question.message}</p>}
              </div>

              <div className="xl:grid xl:grid-cols-2">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Correct Answer</label>
                  <input
                    {...register("correctAnswer")}
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.correctAnswer && <p className="text-red-600 text-sm">{errors.correctAnswer.message}</p>}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Wrong Answers</label>
                  <input
                    {...register("incorrectAnswer")}
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.incorrectAnswer && <p className="text-red-600 text-sm">{errors.incorrectAnswer.message}</p>}
                </div>
              </div>
            </div>

            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Question
            </button>
          </div>
        </form>
      </div>

      <div></div>
    </>
  );
};

export default Questions;
