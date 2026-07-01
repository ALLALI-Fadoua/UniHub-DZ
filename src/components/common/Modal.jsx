import { useEffect } from 'react';
import Button from './Button';

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'primary', // primary | danger
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-lg bg-card p-6.5 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 id="modal-title" className="mb-3 text-[1.1rem]">
            {title}
          </h3>
        )}
        <div className="mb-5.5 text-[0.9rem] text-text">{children}</div>

        <div className="flex justify-end gap-2.5">
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
