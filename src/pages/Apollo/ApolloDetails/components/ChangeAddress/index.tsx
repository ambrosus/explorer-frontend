import ArrowDownBig from '../../../../../assets/icons/Arrows/ArrowDownBig';

export default function ChangeAddress() {
  return (
    <div className="change-address">
      <div className="change-address__address-container">
        <div className="change-address__content">
          <h4 className="change-address__title">NODE OWNER ADDRESS</h4>
          <div className="change-address__address">
            0x8358274af152d78274af152d78274af152d7
          </div>
        </div>
        <button
          className={`stake-size__show-more ${
            false ? 'stake-size__show-more_active' : ''
          }`}
          onClick={() => {}}
        >
          <ArrowDownBig className="stake-size__arrow" />
        </button>
      </div>
      <hr className="change-address__divider" />
      <div className="change-address__address-container">
        <div className="change-address__content">
          <h4 className="change-address__title">NODE OWNER ADDRESS</h4>
          <div className="change-address__address">
            0x8358274af152d78274af152d78274af152d7
          </div>
        </div>
        <button
          className={`stake-size__show-more ${
            false ? 'stake-size__show-more_active' : ''
          }`}
          onClick={() => {}}
        >
          <ArrowDownBig className="stake-size__arrow" />
        </button>
      </div>
    </div>
  );
}
