import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ReactNode } from 'react';
import { Pie } from 'react-chartjs-2';
import DateCard from '../DateCard';
import './Chart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  title: string,
  type: string,
  data: any,
}

export default function Chart({ type, title, data }: ChartProps) {
  const dates = data.datasets[0].data;
  const renderDate = (): ReactNode => {
    let jsx = [];

    for (let year in dates) {
      jsx.push(
        <div className="Chart__visit-dates">
          <p className="Chart__year">{year}</p>
          <div className="Chart__dates">
            {
              dates[year].map((date: string) => (
                <DateCard key={date} date={date} />
              )) 
            }
          </div>
        </div>
      );
    }

    return jsx;
  };

  return (
    <div className="Chart">
      <p className="Chart__title">{title}</p>
      {type === 'qcm' && <Pie data={data} />}
      {type === 'numeric' && <div className="Chart__products">{data.datasets[0].data.toFixed()}</div>}
      {type === 'date' && renderDate()}
    </div>
  );
}
