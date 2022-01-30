import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSurveyByCodeAsync } from '../../reducers/surveys';
import { processData } from '../../selectors/surveys';
import Chart from '../Chart';
import './SurveyPage.css';


export default function SurveyPage() {
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.surveys);
  const processedData = useAppSelector(processData);

  useEffect(() => {
      dispatch(fetchSurveyByCodeAsync(code));
  }, [code]);

  if (status === 'loading' || !processedData) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="SurveyPage">
      <h2>Survey {code}</h2>
      <div className="SurveyPage__charts">
        {processedData.map((data) => (
          <Chart key={data.title} {...data} />
        ))}
      </div>
    </div>
  );
}
