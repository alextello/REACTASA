import React, {useEffect, useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {Button, Col, Modal, Popconfirm, Space, Upload} from 'antd';
import {AppRowContainer} from '../../../@crema';
import Deals from './Deals';
import {
  ArrowsAltOutlined,
  CameraOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ModalAvaluos from './ModalAvaluos';

const Page1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isModalFotosVisible, setIsModalFotosVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [barcode, setBarcode] = useState();
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    if (item.id) {
      setBarcode(item.id);
    } else {
      setBarcode(null);
    }
    console.log('editItem ' + JSON.stringify(item, null, 2));
    console.log('barcode  ' + barcode);
  }, [item]);

  useEffect(() => {
    console.log(JSON.stringify(files, null, 2));
  }, [files]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancelPreview = () => setPreviewVisible(false);

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
                        actions={[
                          <Space
                            direction='vertical'
                            style={{width: '100%'}}
                            size='large'
                            key='fotos'>
                            <Upload
                              onPreview={handlePreview}
                              beforeUpload={(newFile) => {
                                setFiles((files) => [...files, newFile]);
                                return false;
                              }}
                              onRemove={(deletedFile) => {
                                setFiles((files) => {
                                  const index = files.indexOf(deletedFile);
                                  const newFiles = files.slice();
                                  newFiles.splice(index, 1);
                                  return {
                                    ...newFiles,
                                  };
                                });
                              }}
                              // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                              listType='picture-card'
                              maxCount={10}
                              multiple>
                              <Button icon={<CameraOutlined />}></Button>
                            </Upload>
                          </Space>,
                        ]}
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
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}>
        <img
          alt='example'
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
      {/*<ModalFotos isVisible={isModalFotosVisible} />*/}
    </>
  );
};

export default Page1;
