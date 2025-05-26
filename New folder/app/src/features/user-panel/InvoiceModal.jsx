/*eslint-disable */
import styled from "styled-components";
import Button from "../../ui/Button";
import DownloadButton from "../../ui/DownloadButton";

import { backUrl } from "../../utils/constants";
import FormRow from "../../ui/FormRow";
import { useState } from "react";
import Textarea from "../../ui/Textarea";
import { useChangeInvoiceStatus } from "./useChangeInvoiceStatus";

const StyledInvoiceModal = styled.div`
  /* height: 70vh; */
  width: 40vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  // 1200px
  @media screen and (max-width: 75em) {
    width: 60vw;
  }

  // 700px
  @media screen and (max-width: 43.75em) {
    width: 80vw;
  }

  .approve {
    width: 90%;
  }

  .reject {
    width: 90%;
    background-color: var(--color-red-500);
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;
function InvoiceModal({ order, onCloseModal }) {
  const [checkApproved, setCheckApproved] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const { isChangingInvoiceStatus, changeInvoiceStatus } =
    useChangeInvoiceStatus();

  return (
    <StyledInvoiceModal>
      <DownloadButton
        variation="tertiary"
        fileDataUrl={backUrl + order?.invoices?.at(-1)?.invoice_file}
        buttonText="مشاهده پیش‌ فاکتور"
      />

      <Button
        className="approve"
        disabled={!checkApproved || isChangingInvoiceStatus}
        onClick={() => {
          changeInvoiceStatus({
            id: order?.invoices?.at(-1)?.id,
            obj: { status_choice: "accept" },
          });
          onCloseModal();
        }}
      >
        تایید نهایی
      </Button>

      <div className="checkbox-group">
        <input type="checkbox" onClick={() => setCheckApproved((s) => !s)} />
        <div>
          آگاهم که پس از فشردن دکمه تایید نهایی فرایند ارسال آغاز خواهد شد
        </div>
      </div>

      <Button
        className="reject"
        disabled={isChangingInvoiceStatus}
        onClick={() => {
          changeInvoiceStatus({
            id: order?.invoices?.at(-1)?.id,
            obj: {
              status_choice: "deny",
              deny_reason: rejectReason || "no-reason",
            },
          });
          onCloseModal();
        }}
      >
        عدم تایید
      </Button>
      <Textarea
        placeholder="لطفا دلیل عدم تایید خود را برای ما بنویسید"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
      />
    </StyledInvoiceModal>
  );
}

export default InvoiceModal;
