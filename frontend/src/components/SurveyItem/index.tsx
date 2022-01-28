import './SurveyItem.css';

type SurveyItemProps = {
    onClick: () => any,
    code: string,
    name: string
}

export default function SurveyItem({ onClick, code, name }: SurveyItemProps) {

    return (
        <tr
            onClick={onClick}
        >
            <td>{name}</td>
            <td>{code}</td>
        </tr>
    );
}
