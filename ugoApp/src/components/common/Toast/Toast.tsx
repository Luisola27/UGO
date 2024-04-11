import { toast } from "react-semantic-toasts";

export function notification(descrip: string, message: string, type: any) {
  setTimeout(() => {
    toast(
      {
        description: descrip,
        title: message,
        type: type,
        time: 1000,
      },
      () => console.log("Toast")
    );
  }, 1000);
}
