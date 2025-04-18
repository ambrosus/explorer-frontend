import maintenanceImage from '../../assets/images/maintenance.svg';
// @ts-ignore
import styles from './maintenance.module.scss';
import { Button } from '@airdao/ui-library';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Maintenance = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/maintenance/" />
        <title>Maintenance | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Explore AirDAO Network Bundles: average bundle load, aprox bundle, bundle cost, entries total etc."
        />
      </Helmet>
      <div className={styles.container}>
        <img className={styles.pic} src={maintenanceImage} alt="maintenance" />
        <h4 className={styles.title}>
          We're down for maintenance — we'll be back soon. You can contact us at{' '}
          <a href="mailto:support@airdao.io">support@airdao.io</a>
        </h4>
        <Button onClick={() => navigate('/')} type="primary" size="medium">
          Go home
        </Button>
      </div>
    </>
  );
};

export default Maintenance;
