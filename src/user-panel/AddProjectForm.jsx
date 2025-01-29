import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input"; // Correct capitalization for the imported component
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { Project } from "../constans/index";

const ProjectForm = () => {
  const formik = useFormik({
    initialValues: {
      projectName: "",
      projectCode: "",
      permitNumber: "",
      ownerName: "",
      supervisingEngineer: "",
      contractor: "",
      address: "",
      comments: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("نام پروژه الزامی است"),
      projectCode: Yup.string().required("کد یکتای پروژه الزامی است"),
      permitNumber: Yup.string().required("شماره مجوز الزامی است"),
      ownerName: Yup.string().required("نام مالک الزامی است"),
      supervisingEngineer: Yup.string().required("مهندس ناظر الزامی است"),
      contractor: Yup.string().required("نام پیمانکار الزامی است"),
      address: Yup.string().required("آدرس الزامی است"),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  return (
    <div className="my-5 bg-Bokara-Grey">
      <div className="container flex flex-col items-center justify-center min-h-screen text-white border border-School-Bus ">
        <div className="flex flex-row items-center gap-2 pb-4 mt-2 text-center text-white">
          <span className="text-4xl font-medium text-School-Bus">امین</span>
          <img className="w-10 h-10" src={logo} alt="Company Logo" />
          <span className="text-4xl font-medium text-School-Bus">بتن</span>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-2xl p-6 rounded-lg"
        >
          <h2 className="mb-4 text-xl font-bold text-center text-School-Bus">
            پروژه جدید
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {Project.map(({ name, placeholder }) => (
              <div key={name}>
                <Input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  className="w-full text-white rounded pe-20 ps-2"
                />
                {formik.touched[name] && formik.errors[name] ? (
                  <p className="text-sm text-red-500">{formik.errors[name]}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Input
              type="text"
              as="textarea"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder="آدرس پروژه"
              className="w-full p-2 pb-20 text-white bg-gray-700 rounded"
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-sm text-red-500">{formik.errors.address}</p>
            ) : null}
          </div>

          <div className="mt-4">
            <Input
              as="textarea"
              name="comments"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comments}
              placeholder="توضیحات"
              className="w-full p-2 pb-20 text-white bg-gray-700 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
