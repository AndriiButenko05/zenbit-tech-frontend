import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="24" height="24" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
