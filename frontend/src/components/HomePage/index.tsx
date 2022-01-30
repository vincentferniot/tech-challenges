import Surveys from '../Surveys';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSearchValue } from '../../reducers/surveys';
import './HomePage.css';

function HomePage() {
  const search = useAppSelector(state => state.surveys.search);
  const dispatch = useAppDispatch();

  return (
    <div className="HomePage">
      <h2>All available surveys</h2>
      <input
        type="text"
        value={search}
        placeholder="Search available survey"
        onChange={event => dispatch(changeSearchValue(event.target.value))}
      />
      <Surveys />
    </div>
  );
}

export default HomePage;
