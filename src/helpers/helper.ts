import {formatDistanceToNow, parseISO} from 'date-fns';

export const convertTimestamp = (timestamp: any) => {
  const parsedDate = parseISO(timestamp);
  return formatDistanceToNow(parsedDate, {addSuffix: true});
};
