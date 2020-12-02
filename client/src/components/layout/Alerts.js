import { useSelector } from 'react-redux';

const Alerts = () => {
  const alerts = useSelector(({ alerts }) => alerts);

  return (
    alerts?.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
