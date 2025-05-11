import { toast } from "react-toastify";

const toastService = {
  showSuccess: (msg) => {
    toast.success(msg, { autoClose: 2000 });
  },
  showError: (msg) => {
    toast.error(msg, { autoClose: 2000 });
  },
  showInfo: (msg) => {
    toast.info(msg, { autoClose: 2000 });
  },
};

export default toastService;
