export const convertToTurkish = (key) => {
  if (key === "DISCOUNT") {
    return "İNDİRİM";
  } else if (key === "SCHOLARSHIP") {
    return "BURS";
  } else if (key === "scholarshipMustBeDeleted") {
    return "Bursun silinmesi gerekmektedir";
  } else if (key === "discountLimitExceeded") {
    return "İndirim limiti aşıldı";
  } else if (key === "discountMustBeDeleted") {
    return "İndirimin silinmesi gerekmektedir";
  } else if (key === "WAITING") {
    return "BEKLİYOR";
  } else if (key === "APPROVED") {
    return "ONAYLANDI";
  } else if (key === "REJECTED") {
    return "REDDEDİLDİ";
  } else if (key === "cannotAddSiblingDiscount") {
    return "Kardeş indirimi eklenemedi lütfen okula bildirin";
  }
};
