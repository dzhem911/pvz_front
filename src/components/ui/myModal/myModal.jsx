import React from 'react';
import modalStyle from './modal.module.css'

const MyModal = ({children, visible, setVisible, setStep, setSignInVisible, signInVisible, step}) => {

  const rootClasses = [modalStyle.myModal]
  if(visible || signInVisible) {
    rootClasses.push(modalStyle.active)
  }

  const clickHandler = () => {
    if(visible) {
      setVisible(false)
    }
    if(signInVisible){
      setSignInVisible(false)
    }
    if(step) {
      setStep(false)
    }

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