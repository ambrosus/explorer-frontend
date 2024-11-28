import ChartDailyActiveUsers from './chart-daily-active-users';
import ChartMonthlyActiveUsers from './chart-monthly-active-users';

const ActiveUsers = () => {
  return (
    <>
      <div id="users" className="flex flex-col gap-y-6">
        <h4 className="leading-8">Active Users</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          <ChartDailyActiveUsers />
          <ChartMonthlyActiveUsers />
        </div>
      </div>
      <hr className="my-6 border-neutral-500" />
    </>
  );
};

export default ActiveUsers;
