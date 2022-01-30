import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilteredSurveysList } from '../../selectors/surveys';
import { fetchSurveysAsync } from '../../reducers/surveys';
import SurveyItem from '../SurveyItem';
import './Surveys.css';

function Surveys() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(getFilteredSurveysList);

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
                    {...survey}
                />
            ))}
            </tbody>
        </table>
    );
}

export default Surveys;
