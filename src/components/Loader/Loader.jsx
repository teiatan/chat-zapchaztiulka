import { ColorRing } from 'react-loader-spinner';
import './styles.css';

export const Loader = () => {
  return (
    <div className="wrapper-loader">
      <ColorRing
        colors={[
          'rgba(239, 248, 255, 1)',
          'rgba(209, 233, 255, 1)',
          'rgba(46, 144, 250, 1)',
          'rgba(21, 112, 239, 1)',
          'rgba(209, 233, 255, 1)',
        ]}
      />
    </div>
  );
};
