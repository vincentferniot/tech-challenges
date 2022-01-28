import './SurveyItem.css';
import { Link } from 'react-router-dom';

type SurveyItemProps = {
    code: string,
    name: string,
}

export default function SurveyItem({ code, name }: SurveyItemProps) {

    return (
        <tr className="SurveyItem">
            <td><Link to={`surveys/${code}`}>{name}</Link></td>
            <td><Link to={`surveys/${code}`}>{code}</Link></td>
        </tr>
    );
}
