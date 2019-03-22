import ImagePreview from '../../components/ImagePreview';
import { Link } from 'dva/router';
import moment from 'moment';
import appLocaleName from '../../common/Locale.tool';

const menuData = {
  menuName: '费用类型',
  menuFor: 'expenseType',
  subItems: [
    {
      name: 'doctorScheduleList',
      displayName: '医生安排',
      icon: '500px',
      readPermission: false,
      createPermission: false,
      deletePermission: false,
      updatePermission: false,
      executionPermission: false,
    },
  ],
};

const renderTextCell = (value, record) => {
  const userContext = null;
  if (!value) {
    return '';
  }
  if (value == null) {
    return '';
  }
  if (value.length > 15) {
    return (
      value.substring(0, 15) + '...(' + value.length + appLocaleName(userContext, 'Chars') + ')'
    );
  }
  return value;
};

const renderIdentifier = (value, record, targtObjectType) => {
  return <Link to={`/${targtObjectType}/${value}/dashboard`}>{value}</Link>;
};

const renderDateCell = (value, record) => {
  return moment(value).format('YYYY-MM-DD');
};
const renderDateTimeCell = (value, record) => {
  return moment(value).format('YYYY-MM-DD HH:mm');
};

const renderImageCell = (value, record, title) => {
  return <ImagePreview imageTitle={title} imageLocation={value} />;
};

const formatMoney = amount => {
  const options = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const moneyFormat = new Intl.NumberFormat('en-US', options);
  return moneyFormat.format(amount);
};

const renderMoneyCell = (value, record) => {
  const userContext = null;
  if (!value) {
    return appLocaleName(userContext, 'Empty');
  }
  if (value == null) {
    return appLocaleName(userContext, 'Empty');
  }
  return `${appLocaleName(userContext, 'Currency')}${formatMoney(value)}`;
};

const renderBooleanCell = (value, record) => {
  const userContext = null;

  return value ? appLocaleName(userContext, 'Yes') : appLocaleName(userContext, 'No');
};

const renderReferenceCell = (value, record) => {
  const userContext = null;
  return value ? value.displayName : appLocaleName(userContext, 'NotAssigned');
};

const displayColumns = [
  {
    title: 'ID',
    debugtype: 'string',
    dataIndex: 'id',
    width: '20',
    render: (text, record) => renderTextCell(text, record, 'expenseType'),
  },
  {
    title: '名称',
    debugtype: 'string',
    dataIndex: 'name',
    width: '7',
    render: (text, record) => renderTextCell(text, record),
  },
  {
    title: '辅助识字课',
    debugtype: 'string',
    dataIndex: 'helperChars',
    width: '7',
    render: (text, record) => renderTextCell(text, record),
  },
  {
    title: '状态',
    debugtype: 'string',
    dataIndex: 'status',
    width: '6',
    render: (text, record) => renderTextCell(text, record),
  },
  {
    title: '医院',
    dataIndex: 'hospital',
    render: (text, record) => renderReferenceCell(text, record),
  },
  {
    title: '描述',
    debugtype: 'string_longtext',
    dataIndex: 'description',
    width: '10',
    render: (text, record) => renderTextCell(text, record),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    render: (text, record) => renderDateTimeCell(text, record),
  },
];

const fieldLabels = {
  id: 'ID',
  name: '名称',
  helperChars: '辅助识字课',
  status: '状态',
  hospital: '医院',
  description: '描述',
  updateTime: '更新时间',
};

const ExpenseTypeBase = { menuData, displayColumns, fieldLabels };
export default ExpenseTypeBase;
