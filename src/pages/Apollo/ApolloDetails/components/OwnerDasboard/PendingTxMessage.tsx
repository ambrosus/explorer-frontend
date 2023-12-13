import Spinner from '../../../../../components/Spinner';

export default function PendingTxMessage() {
  return (
    <div className="stake-size__pending">
      <Spinner className="stake-size__spinner" />
      <div className="stake-size__pending-text">
        Transaction of changing the stake size is pending...
      </div>
    </div>
  );
}
