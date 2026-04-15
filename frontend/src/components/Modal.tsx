import { useEffect, type ReactNode, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./css/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  preventCloseOutside?: boolean;
  closeOnEsc?: boolean;
  draggable?: boolean;
}

function Modal({
  isOpen,
  title,
  children,
  footer,
  size = 'md',
  onClose,
  preventCloseOutside = false,
  closeOnEsc = true,
  draggable = false
}: ModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEsc && e.key === "Escape") onClose();
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    };

    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return createPortal(
    <div className="app-modal-overlay" onClick={() => !preventCloseOutside && onClose()}>
      <div
        className={`app-modal-window app-modal-${size}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <div
          className={`app-modal-header ${draggable ? 'draggable' : ''}`}
          onMouseDown={onMouseDown}
        >
          <h5 className="app-modal-title">{title}</h5>
          <button className="app-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="app-modal-body">
          {children}
        </div>

        {footer && (
          <div className="app-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
