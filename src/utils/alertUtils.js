import swal from "sweetalert";

export const alertUtils = {
  confirmationAlert,
  successAlert
};

function confirmationAlert(title, message, icon, confirmButtonText, cancelButtonText, dangerMode) {
  return new Promise((resolve, reject) => {
    swal({
      title: title,
      text: message,
      icon: icon,
      buttons: [cancelButtonText, confirmButtonText],
      dangerMode: dangerMode,
    })
      .then((confirm) => {
        if (confirm) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(() => {});
  });
}

function successAlert(title, message, icon, dangerMode) {
  return new Promise((resolve, reject) => {
    swal({
      title: title,
      text: message,
      icon: icon,
      buttons: true,
      dangerMode: dangerMode,
    })
      .then((confirm) => {
        if (confirm) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(() => {});
  });
}
