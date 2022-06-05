import React  from 'react';
import { Table} from 'antd';
import './index.style.less';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';

const AppTableContainer = (props) => {
  const {columns, data, pagination, hoverColor, className, showModal, ...rest} = props;
  
  const preShow = (record, rowIndex) => {
    if(showModal) {
      showModal(record, rowIndex);
    }
  }

  return (
    <>
      <QueueAnim delay={300} className="queue-simple">
        <QueueAnim>
          <Table
            columns={columns}
            dataSource={data}
            className={clsx('table-responsive', {hoverColor: hoverColor}, className)}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  preShow(record, rowIndex);
                },
              };
            }}
            onClick={() => showModal}
            onMouseEnter={() => showModal}
            pagination={pagination}
            rowKey='id'
            {...rest}
          >
          </Table>
        </QueueAnim>
      </QueueAnim>
    </>
  );
};

export default AppTableContainer;

AppTableContainer.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.array,
  className: PropTypes.string,
  pagination: PropTypes.bool,
  hoverColor: PropTypes.bool,
  showModal: PropTypes.func,
};

AppTableContainer.defaultProps = {
  pagination: false,
};
