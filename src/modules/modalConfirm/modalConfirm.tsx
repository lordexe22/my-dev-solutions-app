/* src\modules\myCustomTag\modal-confirm.tsx */
import React from "react";
import styles from "./modalConfirm.module.css";

interface ModalConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.modalConfirmButton}
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            type="button"
            className={styles.modalCancelButton}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
