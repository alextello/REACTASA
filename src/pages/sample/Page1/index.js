import React, {useEffect, useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {Button, Col, Popconfirm} from 'antd';
import {AppRowContainer} from '../../../@crema';
import Deals from './Deals';
import {ArrowsAltOutlined, CloseOutlined} from '@ant-design/icons';
import ModalAvaluos from './ModalAvaluos';

const Page1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [barcode, setBarcode] = useState();

  useEffect(() => {
    if (item.id) {
      setBarcode(item.id);
    } else {
      setBarcode(null);
    }
    console.log('editItem ' + JSON.stringify(item, null, 2));
    console.log('barcode  ' + barcode);
  }, [item]);

  const eliminarItem = (e) => {
    const newItems = items.filter((it) => it.id !== e.id);
    setItems(newItems);
  };

  const showModal = () => {
    console.log('show modal...');
    setBarcode(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setItem({});
    setIsModalVisible(false);
  };

  const openEditItem = (item) => {
    setItem({...item});
    setBarcode(item.id);
    setIsModalVisible(true);
  };

  const save = (data) => {
    setItems((items) => [...items, {...data}]);
  };

  const saveAndClose = (data) => {
    setItems((items) => [...items, {...data}]);
    setIsModalVisible(false);
  };

  return (
    <>
      <AppRowContainer>
        <Col span={24}>
          <AppCard title='Prendario'>
            <Button type='primary' onClick={showModal}>
              Avaluo de prendas
            </Button>
          </AppCard>
        </Col>
      </AppRowContainer>
      {items.length > 0 && (
        <AppRowContainer>
          <Col span={24}>
            <AppCard title={'Articulos de paquete'}>
              <AppRowContainer justify='space-around'>
                {items.map((e, i) => {
                  return (
                    <Col key={i}>
                      <AppCard
                        title={e.nombre}
                        bordered={true}
                        extra={
                          <>
                            <Popconfirm
                              placement='topLeft'
                              title='¿Esta seguro de remover este artículo?'
                              onConfirm={() => eliminarItem(e)}
                              okText='Sí'
                              cancelText='No'>
                              <Button className='close-btn'>
                                <CloseOutlined />
                              </Button>
                            </Popconfirm>
                            <Button
                              className='close-btn'
                              onClick={() => {
                                openEditItem(e);
                              }}>
                              <ArrowsAltOutlined />
                            </Button>
                          </>
                        }>
                        <AppRowContainer>
                          <Col>
                            <h5>Valor ofrecido:</h5>
                          </Col>
                          <Col>{`Q ${e.montoOfrecido}`}</Col>
                        </AppRowContainer>
                      </AppCard>
                    </Col>
                  );
                })}
              </AppRowContainer>
              <AppRowContainer justify={'end'}>
                <Col>
                  <h3>TOTAL OFRECIDO:</h3>
                </Col>
                <Col>
                  <h2>
                    {items.reduce((acc, it) => acc + it.montoOfrecido, 0)}
                  </h2>
                </Col>
              </AppRowContainer>
            </AppCard>
          </Col>
        </AppRowContainer>
      )}
      <AppRowContainer>
        <Col span={24}>
          <Deals></Deals>
        </Col>
      </AppRowContainer>
      <ModalAvaluos
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        save={save}
        saveAndClose={saveAndClose}
        formData={item}
        barcode={barcode}
      />
    </>
  );
};

export default Page1;
