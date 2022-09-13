import React, {useState} from 'react';
import modalStyle from './modal.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import {useDispatch, useSelector} from "react-redux";
import {hideRegModalAction, hideSignInModalAction} from "../../../redux/modalsReducer";

const MyModal = ({children, visible, setVisible, setStep, setSignInVisible, signInVisible, step, pasResetModal, setPasResetModal}) => {

  const rootClasses = [modalStyle.myModal]
  const dispatch = useDispatch()
  const regModal = useSelector(state => state.modal.registrationModal)
  const loginModal = useSelector(state => state.modal.signInModal)


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

    if(regModal) {
      dispatch(hideRegModalAction())
    }
  }

  return (
    <div className={rootClasses.join(' ')} onClick={clickHandler}>
      <CancelIcon className={modalStyle.closeIcon} sx={{color: '#EEE'}} />
      <div className={modalStyle.myModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;