/*eslint-disable */
import { FaFileInvoice } from "react-icons/fa";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import InvoiceModal from "./InvoiceModal";

const StyledOrderDetailInvoice = styled.div`
  height: 10rem;
  width: 100%;
  padding: 1rem 2rem;
  border: 1px dashed var(--color-brand-500);
  margin-bottom: 10rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .title {
    font-weight: 700;

    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    width: 100%;
  }
`;

function OrderDetailInvoice({ order }) {
  return (
    <StyledOrderDetailInvoice>
      <div className="title">
        <FaFileInvoice />
        رسید
      </div>

      {order?.invoices?.length === 0 ? (
        "فاکتوری جهت مشاهده موجود نیست."
      ) : (
        <Modal>
          <Modal.Open opens="invoice">
            <Button>مشاهده پیش فاکتور</Button>
          </Modal.Open>
          <Modal.Window name="invoice">
            <InvoiceModal order={order} />
          </Modal.Window>
        </Modal>
      )}
    </StyledOrderDetailInvoice>
  );
}

export default OrderDetailInvoice;
