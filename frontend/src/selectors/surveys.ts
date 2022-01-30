import { random } from 'colord';
import type { RootState } from '../store';
import dayjs from 'dayjs';

interface ProcessData {
  type: 'qcm' | 'date' | 'numeric',
  title: string,
  data: {}
};

export const processData = (state: RootState): ProcessData[] => {
  return state.surveys.current.map(({type, label, result}) => {
    const colors = Object.values(result).map(() => random());
    let data = result;

    if (type === 'qcm') {
      data = Object.values(result);
    }
    else if (type === 'date') {
      data = result.reduce((acc: any, currentValue: string) => {
        const key = dayjs(currentValue).year().toString();
        // if value exists at current key, inject new vaue in array, else create new array with currentValue
        acc[key] ? acc[key] = [...acc[key], currentValue] : acc[key] = [currentValue];
        acc[key].sort();
        return acc;
      }, {});
    }

    return {
      type,
      title: label,
      data: {
        labels: type === 'qcm' ? Object.keys(result).sort() : '',
        datasets: [
          {
            label,
            data,
            backgroundColor: colors.map(color => color.alpha(0.2).toRgbString()),
            borderColor: colors.map(color => color.toRgbString()),
            borderWidth: 1,
          }
        ]
      },
    }
  });
}