import React from 'react'
import { Portal, PortalTarget } from './Portal';
import './style.css';

type ModalProps = {
  isOpen?: boolean;
  renderHeader?: () => React.ReactNode;
  children: React.ReactNode | React.ReactNode[] | JSX.Element | React.ReactElement;
  renderAction?: () => React.ReactNode;
  handleClose: () => void;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
}
export const Modal = ({
  isOpen,
  children,
  renderHeader,
  renderAction,
  handleClose,
  className,
  size,
}: ModalProps) => {
  const outsideRef = React.useRef(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      handleClose();
    }
  }

  return isOpen ? (
    <Portal target={PortalTarget.MODAL}>
      <div
        ref={outsideRef}
        className="modal-container"
        onClick={closeModal}
      >
        <div className={`modal ${className} size-${size}`}>
          <div className="modal-header">
            {renderHeader && renderHeader()}
          </div>
          <div className="modal-body">{children}</div>
          {renderAction !== null && typeof renderAction === 'function' && (
            <div className="modal-action">
              {renderAction()}
            </div>
          )}
        </div>
      </div>
    </Portal> 
    ): null;
}

Modal.defaultProps = {
  isOpen: false,
  renderAction: null,
  renderHeader: null,
  size: 'md',
  className: '',
}
