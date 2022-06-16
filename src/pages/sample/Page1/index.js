import React, {useEffect, useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {
  Button,
  Col,
  Descriptions,
  Modal,
  Popconfirm,
  Row,
  Statistic,
  Upload,
} from 'antd';
import {AppRowContainer} from '../../../@crema';
import Deals from './Deals';
import {
  ArrowsAltOutlined,
  CameraOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ModalAvaluos from './ModalAvaluos';
import {Text} from 'recharts';
import ModalContrato from './ModalContrato';

const Page1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalContratoVisible, setIsModalContratoVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [barcode, setBarcode] = useState();
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  let formData = new FormData();

  useEffect(() => {
    if (item.id) {
      setBarcode(item.id);
    } else {
      setBarcode(null);
    }
  }, [item]);

  useEffect(() => {
    setMontoTotal(items.reduce((acc, it) => acc + it.montoConcedido, 0));
  }, [items]);

  useEffect(() => {
    files.forEach((file) => {
      formData.append('files[]', file.originFileObj);
    });
    console.log(formData);
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

  const handleCancelContrato = () => {
    setIsModalContratoVisible(false);
  };

  const showModalContrato = () => {
    setIsModalContratoVisible(true);
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
    setBarcode(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setBarcode(null);
    setItem({});
    setIsModalVisible(false);
  };

  const openEditItem = (item) => {
    setItem({...item});
    setBarcode(item.id);
    setIsModalVisible(true);
  };

  const save = (data) => {
    setBarcode(null);
    handleSave(data);
  };

  const saveAndClose = (data) => {
    setBarcode(null);
    setIsModalVisible(false);
    handleSave(data);
  };

  const handleSave = (data) => {
    const indexUpdatedItem = items.findIndex((it) => it.id === data.id);
    if (indexUpdatedItem >= 0) {
      let newItems = [...items];
      newItems[indexUpdatedItem] = {...data};
      setItems([...newItems]);
    } else {
      setItems((items) => [...items, {...data}]);
    }
  };

  const onRemoveHandler = (deletedFile) => {
    if (files.length > 0) {
      setFiles((files) => {
        const index = files.indexOf(deletedFile);
        const newFiles = files.slice();
        newFiles.splice(index, 1);
        return [...newFiles];
      });
    }
  };

  const beforeUploadHandler = (newFile, item) => {
    newFile.id = item.id;
    setFiles((files) => [...files, {...newFile}]);
    return false;
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
              <AppRowContainer>
                <Col span={24}>
                  <Descriptions title='' bordered>
                    <Descriptions.Item label='Monto total ofrecido al cliente'>
                      {`Q. ${montoTotal}`}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </AppRowContainer>
              <Text strong>Proyección de pagos: </Text>
              <Row gutter={16}>
                <Col span={6}>
                  <Statistic
                    title='Semana 1'
                    value={Math.round(montoTotal * 1.025).toFixed(2)}
                    prefix={'Q '}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title='Semana 2'
                    value={Math.round(montoTotal * 1.05).toFixed(2)}
                    prefix={'Q '}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title='Semana 3'
                    value={Math.round(montoTotal * 1.075).toFixed(2)}
                    prefix={'Q '}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title='Semana 4'
                    value={Math.round(montoTotal * 1.1).toFixed(2)}
                    prefix={'Q '}
                  />
                </Col>
              </Row>
              <AppRowContainer>
                {items.map((e, i) => {
                  return (
                    <Col key={i}>
                      <AppCard
                        title={`${e.nombre} - ${e.id}`}
                        bordered={true}
                        actions={
                          [
                            // <Space direction='vertical' size='large' key='fotos'>
                            // </Space>,
                          ]
                        }
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
                          <Col>{`Q ${e.montoConcedido}`}</Col>
                        </AppRowContainer>
                        <Upload
                          key='fotos'
                          onPreview={handlePreview}
                          beforeUpload={(newFile) => {
                            return beforeUploadHandler(newFile, e);
                          }}
                          onRemove={(deletedFile) => {
                            return onRemoveHandler(deletedFile);
                          }}
                          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                          listType='picture-card'
                          maxCount={10}
                          multiple>
                          <Button icon={<CameraOutlined />}></Button>
                        </Upload>
                      </AppCard>
                    </Col>
                  );
                })}
              </AppRowContainer>
              <AppRowContainer justify={'end'}>
                <Col>
                  <Button
                    type='primary'
                    size={'large'}
                    style={{background: '#52C41A'}}
                    onClick={() => showModalContrato()}>
                    Realizar contrato
                  </Button>
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
      <ModalContrato
        isVisible={isModalContratoVisible}
        handleCancel={handleCancelContrato}
        formData={items}
        images={formData}
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
