import chevron from 'assets/svg/chevron.svg';

const steps = [1, 2, 3, 4, 5];
interface BreadcrumbsProps {
  setStep: (value: number) => {};
  lastAvailableStep: number;
  step: number;
}

const Breadcrumbs = ({
  setStep,
  lastAvailableStep,
  step,
}: BreadcrumbsProps) => {
  console.log(step);
  return (
    <div className="node-breadcrumbs">
      {steps.map((el: number) => (
        <button
          className={`node-breadcrumbs__item ${
            step === el ? 'node-breadcrumbs__item_active' : ''
          }`}
          key={el}
          onClick={() => setStep(el)}
          disabled={el > lastAvailableStep}
        >
          {el !== 5 ? `Step ${el}` : 'Review'}
          {el !== 5 && <img src={chevron} alt="chevron" />}
        </button>
      ))}
    </div>
  );
};

export default Breadcrumbs;
