/*eslint-disable */
import styled from "styled-components";
import { convertGeorgianDateToJalali } from "../../utils/helpers";

const StyledOrderDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-around;
  grid-gap: 4rem;
  margin-bottom: 15rem;

  // 900px
  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;
  }

  .green-box {
    background-color: var(--color-brand-300);
    border: 1px solid black;
    padding: 0.5rem 1rem;
    text-align: center;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .project-name {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--color-brand-500);
      margin-bottom: 3rem;
    }

    .order-name {
      font-weight: 900;
      font-size: 2rem;
    }

    .order-description {
      color: var(--color-grey-500);
      font-size: 1.4rem;
      font-weight: 300;
      line-height: 2.5;
    }
  }

  .left-side {
    justify-self: center;
    img {
      width: 40rem;
      height: 40rem;

      // 1100px
      @media screen and (max-width: 68.75em) {
        width: 35rem;
        height: 35rem;
      }

      // 1000px
      @media screen and (max-width: 62.5em) {
        width: 30rem;
        height: 30rem;
      }
    }
  }
`;

function OrderDetailHeader({ order }) {
  console.log("order is", order);
  const deliveryDate = convertGeorgianDateToJalali(
    order.delivery_datetime.split(" ")[0]
  );
  const deliveryTime = order.delivery_datetime.split(" ")[1];

  return (
    <StyledOrderDetailHeader>
      <div className="right-side">
        <div className="project-name">{order.project.title}</div>
        <div className="order-name">{order.order_name}</div>
        <div className="order-description">
          بتن ماده‌ای ساختمانی است که از ترکیبی از مواد مانند سیمان، ماسه،
          ماسه‌سیمان، آب و مواد افزودنی تشکیل شده است. این ترکیب پس از تراکم و
          تصلب، خصوصیاتی چون دوام، مقاومت مکانیکی و قابلیت تحمل وزن را به
          سازه‌ها و ساختمان‌ها انتقال می‌دهد. به عنوان یک مصالح ساختمانی چند
          منظوره، بتن به دلیل قابلیت تشکیل ورقهای مختلف و تلفیق با سازه‌های فلزی
          یا فیبری، در انواع ساختمان‌ها به‌کار می‌رود. بتن ماده‌ای ساختمانی است
          که از ترکیبی از مواد مانند سیمان، ماسه، ماسه‌سیمان، آب و مواد افزودنی
          تشکیل شده است. این ترکیب پس از تراکم و تصلب، خصوصیاتی چون دوام، مقاومت
          مکانیکی و قابلیت تحمل وزن را به سازه‌ها و ساختمان‌ها انتقال می‌دهد. به
          عنوان یک مصالح ساختمانی چند منظوره، بتن به دلیل قابلیت تشکیل ورقهای
          مختلف و تلفیق با سازه‌های فلزی یا فیبری، در انواع ساختمان‌ها به‌کار
          می‌رود.
        </div>

        <div className="green-box">
          ارسال این خرید در تاریخ {deliveryDate} و ساعت {deliveryTime} ثبت شده
          است.
        </div>

        <div className="green-box">{order.concrete_area_size} متر مکعب</div>
      </div>

      <div className="left-side">
        <img src="/images/brick-1.jpg" alt="concrete-image" />
      </div>
    </StyledOrderDetailHeader>
  );
}

export default OrderDetailHeader;
