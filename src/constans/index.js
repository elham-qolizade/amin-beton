import pic1 from "../assets//images/7f247ff51d072c6c8178a90620cfe5de.png";
import pic2 from "../assets//images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";
import * as Yup from "yup";
import product1 from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";
import product2 from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";
import product3 from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";
import product4 from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";


 export const products = [
  { id: 1, image: product1, title: "دال های بتنی پیش ساخته", isMain: true },
  { id: 2, image: product2, title: "بلوک های بتنی", isMain: false },
  { id: 3, image: product3, title: "لوله های بتنی", isMain: true },
  { id: 4, image: product4, title: "جداول بتنی", isMain: false },
];
export const slider = [
    {
        title: "نوآوری در حمل و نقل",
   p1:"امین بتن با سال‌ها تجربه در عرصه ساخت و ساز، به عنوان یک نماینده برجسته در این صنعت شناخته می‌شود. ",
   p2:"ما با استفاده از مواد با کیفیت بالا و تخصص فنی، در اجرای پروژه‌های متنوع به عنوان یک شریک مورد اعتماد شناخته می‌شویم",
   p3:"هدف ما تولید بتن با دوام و مقاومت بالا برای ساختمان‌ها و زیرساخت‌های پایدار است. به دنبال ارتقاء فرآیندها و خدمات، ما با افتخار به ارائه راهکارهای بتنی منحصربه‌فرد ادامه می‌دهیم.",
         backgroundImage: pic2,
      },
      {
        title: "نوآوری در حمل و نقل",
        p1:"امین بتن با سال‌ها تجربه در عرصه ساخت و ساز، به عنوان یک نماینده برجسته در این صنعت شناخته می‌شود. ",
        p2:"ما با استفاده از مواد با کیفیت بالا و تخصص فنی، در اجرای پروژه‌های متنوع به عنوان یک شریک مورد اعتماد شناخته می‌شویم",
        p3:"هدف ما تولید بتن با دوام و مقاومت بالا برای ساختمان‌ها و زیرساخت‌های پایدار است. به دنبال ارتقاء فرآیندها و خدمات، ما با افتخار به ارائه راهکارهای بتنی منحصربه‌فرد ادامه می‌دهیم.",
        backgroundImage: pic1,
      },
      {
        title: "نوآوری در حمل و نقل",
        p1:"امین بتن با سال‌ها تجربه در عرصه ساخت و ساز، به عنوان یک نماینده برجسته در این صنعت شناخته می‌شود. ",
        p2:"ما با استفاده از مواد با کیفیت بالا و تخصص فنی، در اجرای پروژه‌های متنوع به عنوان یک شریک مورد اعتماد شناخته می‌شویم",
        p3:"هدف ما تولید بتن با دوام و مقاومت بالا برای ساختمان‌ها و زیرساخت‌های پایدار است. به دنبال ارتقاء فرآیندها و خدمات، ما با افتخار به ارائه راهکارهای بتنی منحصربه‌فرد ادامه می‌دهیم.",
        backgroundImage: pic2,
      },
  ];
  export const NewProject = [
    { name: "projectName", placeholder: "نام پروژه" },
    { name: "projectCode", placeholder: "کد پستی پروژه" },
    { name: "permitNumber", placeholder: "شماره پرونده" },
    { name: "registrationplate", placeholder: "پلاک ثبتی پروژه" },
    { name: "supervisingEngineer", placeholder: "مهندس ناظر" },
    { name: "User", placeholder: "کاربری" },
    { name: "Manufacturer", placeholder: "سازنده" },
    { name: "Employer", placeholder: "کارفرما" },
    { name: "startdate", placeholder: "تاریخ شروع پروژه" },
    { name: "enddate", placeholder: "تاریخ پایان پروژه" },
    { name: "latitude", placeholder: "عرض جغرافیایی" },
    {name: "longitude", placeholder: "طول جغرافیایی" }
  ];

   export const projects = [
    { id: 1, title: "پروژه اول", image:product2 , description: "", color: "text-School-Bus" },
    { id: 2, title: "پروژه دوم", image:product2 , description: "", color: "text-School-Bus" },
    { id: 3, title: "پروژه سوم",  image:product2 , description: "پروژه به انجام رسیده است", color: "text-white" },
    { id: 4, title: "پروژه چهارم", image:product2 , description: "پروژه به انجام رسیده است", color: "text-white" }
  ];

  export const purchases = [
    { id: 1, floor: "طبقه 2+",  name:"دیوار و ستون - SCC C 20", status: "", details: "متراژ پمپ", order: "تاریخ ثبت سفارش", delivery: "تاریخ ارسال",number:"تعداد ویبراتور" },
    { id: 2, floor: "طبقه 3+", name: "دیوار و ستون - SCC C 20", details: "متراژ پمپ", order: "تاریخ ثبت سفارش", delivery: "تاریخ ارسال",number:"تعداد ویبراتور" },
    { id: 3, floor: "طبقه 6",name: "دیوار و ستون - SCC C 20", status: "سفارش تحویل داده شده است", details: "متراژ پمپ", order: "SCC C 20", delivery: "تاریخ ارسال",number:"تعداد ویبراتور" },
    { id: 4, floor: "طبقه 7+",name: "دیوار و ستون - SCC C 20", status: "سفارش تحویل داده شده است", details: "متراژ پمپ", order: "SCC C 20", delivery: "تاریخ ارسال", number:"تعداد ویبراتور" }
  ];

   export const VehicleTracking =[
    { id: 1, name: "ماشین اول", driver: "علی محمدی", plate: "۱۲۳-الف-۴۵۶", load: "۱۰ تن", exitTime: "۱۴:۳۰", waybill: "WB-001", totalLoad: "۵۰ تن", position: [35.6892, 51.389] },
    { id: 2, name: "ماشین دوم", driver: "رضا احمدی", plate: "۴۵۶-ب-۷۸۹", load: "۸ تن", exitTime: "۱۵:۰۰", waybill: "WB-002", totalLoad: "۵۰ تن", position: [35.7, 51.4] },
    { id: 3, name: "ماشین سوم", driver: "مهدی حسینی", plate: "۷۸۹-ج-۰۱۲", load: "۱۲ تن", exitTime: "۱۵:۳۰", waybill: "WB-003", totalLoad: "۵۰ تن", position: [35.71, 51.41] },
    { id: 4, name: "ماشین چهارم", driver: "حسن رضایی", plate: "۰۱۲-د-۳۴۵", load: "۹ تن", exitTime: "۱۶:۰۰", waybill: "WB-004", totalLoad: "۵۰ تن", position: [35.72, 51.42] }
   ]
   export const Pump=[
    { id: 1, name: "پمپ اول", backgroundImage: product1 ,},
    { id: 2, name: "پمپ دوم ",  backgroundImage: product1 ,  },
    { id: 3, name: "پمپ سوم ",   backgroundImage: product1 ,  },
    { id: 4, name: "پمپ چهارم", backgroundImage: product1 ,}
   ]
   export const Vibrator=[
    { id: 1, name: "ویبراتور اول", backgroundImage: product1 ,},
    { id: 2, name: "ویبراتور دوم",  backgroundImage: product1 ,  },
    { id: 3, name: "ویبراتور سوم",   backgroundImage: product1 ,  },
    { id: 4, name: "ویبراتور چهارم", backgroundImage: product1 ,}
   ]


   export const ProjectFields = [
    {
      name: "title",
      placeholder: "عنوان",
      validation: Yup.string().min(1).max(256).required("عنوان الزامی است"),
    },
    {
      name: "description",
      placeholder: "توضیحات",
      validation: Yup.string().min(1).max(5000).required("توضیحات الزامی است"),
    },
    {
      name: "address",
      placeholder: "آدرس",
      validation: Yup.string().min(1).max(1024),
    },
    {
      name: "postal_code",
      placeholder: "کد پستی",
      validation: Yup.string()
        .matches(/^\d+$/, "فقط عدد مجاز است")
        .min(5, "حداقل ۵ رقم")
        .max(10, "حداکثر ۱۰ رقم"),
    },
    {
      name: "registered_plate",
      placeholder: "پلاک ثبتی",
      validation: Yup.string()
        .matches(/^\d+$/, "فقط عدد مجاز است")
        .min(1)
        .max(32)
        .required("پلاک ثبتی الزامی است"),
    },
    {
      name: "case_number",
      placeholder: "شماره پرونده",
      validation: Yup.string()
        .matches(/^\d+$/, "فقط عدد مجاز است")
        .min(1)
        .max(32)
        .required("شماره پرونده الزامی است"),
    },
    {
      name: "supervising_engineer",
      placeholder: "مهندس ناظر",
      validation: Yup.string().min(1).max(128).required("مهندس ناظر الزامی است"),
    },
    {
      name: "builder",
      placeholder: "سازنده",
      validation: Yup.string().min(1).max(128).required("سازنده الزامی است"),
    },
    {
      name: "employer",
      placeholder: "کارفرما",
      validation: Yup.string().min(1).max(32).required("کارفرما الزامی است"),
    },
    {
      name: "type",
      placeholder: "کاربری",
      validation: Yup.string().min(1).max(128).required("کاربری الزامی است"),
    },
  ];
  

