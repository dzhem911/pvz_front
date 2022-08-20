import React from 'react';
import modalStyle from './modal.module.css'
import CancelIcon from '@mui/icons-material/Cancel';

const MyModal = ({children, visible, setVisible, setStep, setSignInVisible, signInVisible, step, pasResetModal, setPasResetModal}) => {

  const rootClasses = [modalStyle.myModal]
  if(visible || signInVisible || pasResetModal) {
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
    if(pasResetModal) {
      setPasResetModal(false)
    }
  }

  return (
    <div className={rootClasses.join(' ')} onClick={clickHandler}>
      {/*<CancelIcon className={modalStyle.closeIcon} />*/}
      <div className={modalStyle.myModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;