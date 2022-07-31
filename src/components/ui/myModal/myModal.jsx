import React from 'react';
import modalStyle from './modal.module.css'

const MyModal = ({children, visible, setVisible, setStep}) => {

  const rootClasses = [modalStyle.myModal]
  if(visible) {
    rootClasses.push(modalStyle.active)
  }

  const clickHandler = () => {
    setVisible(false)
    setStep(false)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={clickHandler}>
      <div className={modalStyle.myModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;