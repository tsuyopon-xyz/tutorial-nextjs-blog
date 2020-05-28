import { parseISO, format } from 'date-fns'

interface IDateParams {
  dateString: string;
}

export default function Date({ dateString }: IDateParams) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}