import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSurveysAsync, fetchSurveyByCodeAsync } from '../../reducers/surveys';
import SurveyItem from '../SurveyItem';
import './Surveys.css';

function Surveys() {
    const dispatch = useAppDispatch();
    const { list, status } = useAppSelector((state) => state.surveys);

    useEffect(() => {
        dispatch(fetchSurveysAsync());
    }, []);

    return (
        <table className="Surveys">
            <thead>
                <tr>
                    <th>Name</th><th>Code</th>
                </tr>
            </thead>
            <tbody>
            {list.map((survey) => (
                <SurveyItem
                    key={survey.code}
                    onClick={() => dispatch(fetchSurveyByCodeAsync(survey.code))}
                    {...survey}
                />
            ))}
            </tbody>
        </table>
    );
}

export default Surveys;
