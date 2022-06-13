import AppTableContainer from '../../../@crema/core/AppTableContainer';
import AppCard from '../../../@crema/core/AppCard';

const Paquete = () => {
  const columns = [
    {
      title: 'Progreso',
      dataIndex: 'progress',
      key: 'progress',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
  ];
  <AppCard title='Paquete'>
    <AppTableContainer columns={columns}>

    </AppTableContainer>
  </AppCard>
}

export default Paquete;
