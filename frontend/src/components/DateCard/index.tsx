import dayjs from 'dayjs';
import './DateCard.css';

type DateCardProps = {
  date: string,
}

export default function DateCard({ date }: DateCardProps) {
  return (
    <div className="DateCard">
      <p className="DateCard__day">{dayjs(date).format('DD')}</p>
      <p className="DateCard__month">{dayjs(date).format('MMM')}</p>
    </div>
  );
}
