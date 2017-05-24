import moment from 'moment'

export const fromNow = datetime => moment(datetime, 'YYYYMMDD').fromNow()

export default fromNow

