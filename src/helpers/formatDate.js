import { format, parseISO, fromUnixTime } from 'date-fns';
import ukLocale from 'date-fns/locale/uk';

export const formatDate = date => {
  if (typeof date === 'number') {
    const dateObject = fromUnixTime(date / 1000);
    if (isNaN(dateObject)) {
      return 'Invalid Date';
    }
    return format(dateObject, 'HH:mm', {
      locale: ukLocale,
    });
  } else if (typeof date === 'string') {
    const parsedDate = parseISO(date);

    if (isNaN(parsedDate)) {
      return 'Invalid Date';
    }

    return format(parsedDate, 'HH:mm', {
      locale: ukLocale,
    });
  } else {
    return 'Invalid Date';
  }
};
