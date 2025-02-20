export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("fa-IR");
};


export const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, "$1 $2 $3");
};
