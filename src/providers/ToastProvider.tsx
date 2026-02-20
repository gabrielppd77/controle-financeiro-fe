import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider(props: ToastProviderProps) {
  const { children } = props;

  return (
    <div>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        closeOnClick
        theme="colored"
      />
    </div>
  );
}
