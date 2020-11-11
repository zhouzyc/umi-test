import React, { useState } from 'react';

import { Modal } from 'antd';

import './index.less';

interface ConfirmPropType {
  onOk?: Function;
  okText?: string;
  cancelText?: string;
  ModalText?: string;
  title?: string;
  btnName?: string;
}

export default (props: ConfirmPropType) => {
  const { onOk, okText, cancelText, ModalText, title,btnName } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
    setConfirmLoading(false)
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    onOk && onOk(handleCancel)
  };
  return (
    <>
      <span className="btn-text" onClick={showModal}>
        {btnName || '操作'}
      </span>
      <Modal
        className="option-confirm"
        title={title || 'title'}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
        maskClosable={false}
      >
        <p className="">{ModalText || '确认进行操作?'}</p>
      </Modal>
    </>
  );
};
