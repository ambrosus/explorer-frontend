import React from 'react'

// import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
// import API from "API/api";
// import { CustomTooltip } from "./Tooltip";
// import moment from "moment";
// import Loader from "../Loader";
import { useTypedSelector } from '../../hooks/useTypedSelector'

const Chart = () => {
	const { data: appData } = useTypedSelector((state: any) => state.app)
	//   const [data, setData] = useState([]);
	// // const [type,setHistoryTransactionType] = useState("transfers");
	//   // @ts-ignore
	//   useEffect(async () => {
	//     // TODO : get transactions data
	//     const { data: explorerTrans }: any = await API.getTransactions({
	//       limit: 50000,
	//       type:'transactions'
	//     });
	//
	//     const last30Days :any= [];
	//     const today = new Date();
	//     const lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
	//     for (let i = 0; i < 30; i++) {
	//       const date = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + i);
	//       const dateInFormat = moment(date).format("MMM Do ");
	//       const transactionsCountPerDay = explorerTrans.filter(
	//         (transaction: any) =>
	//           moment(transaction.timestamp * 1000).format("MMM Do ") === dateInFormat
	//       ).length;
	//       last30Days.push({ date: dateInFormat, count: transactionsCountPerDay });
	//     }
	//     setData(last30Days);
	//   }, []);
	return (
		<div className="bundles-activity">
			<div className="chart-header-title">BUNDLES ACTIVITY</div>
			<div className="bundlesActivity">{appData?.netInfo?.bundlesActivity}</div>
			<div className="days">Last 24 hours</div>
		</div>
		/* <div className="chart">
     <div className="chart-header">
        <span> <DropDown
         placeholder="Select an option"
         value={type}
         onChange={(e:any) => setHistoryTransactionType(e.value)}
         options={[
           'transactions',
           'transfers',
           'contracts',
           'fees',
           'validator_proxies',
           'bundle_uploads',
           'block_rewards',
           'kycs',
           'challenges',
           'payouts',
           'roles',
           'heads',
         ].map((option: any) => ({
           key: option.toLowerCase(),
           value: option.toUpperCase(),
         }))}
       /></span>
     </div>
     <div>
       {data?.length ? <AreaChart width={320} height={140} data={data}
                                  margin={{
                                    top: 20,
                                    right: 25,
                                    bottom: 0
                                  }}>

         <Area dataKey="count" stroke="#212121" fill="url(#colorUv)" width={4}
               strokeWidth={1.5} />
         <YAxis
           style={{
             fontStyle: "normal",
             fontWeight: 400,
             fontSize: 11,
             lineHeight: 24,
             color: "#9198BB"
           }}
           axisLine={false}
           tickLine={false}
           tickCount={3}
           domain={["auto", "auto"]}
         />
         <XAxis
           domain={["auto", "auto"]}
           fontSize={12}
           axisLine={false}
           tickLine={false}
           style={{
             paddingRight: "10px",
             paddingTop: "10px",
             fontFamily: "Proxima Nova",
             fontStyle: "normal",
             fontWeight: 600,
             fontSize: 11,
             lineHeight: 24,
             color: "#58667E"
           }}
           dataKey="date"
         />

         <Tooltip cursor={false} content={<CustomTooltip />} />
       </AreaChart> : <div style={{
         position:'relative',
         height:'140px',
       }}><div style={{
       position:'absolute',
       top:'50%',
       transform:'translateX(-50%)'
       }
       }><Loader /></div></div>}

     </div>
   </div>
     */
	)
}

export default Chart
