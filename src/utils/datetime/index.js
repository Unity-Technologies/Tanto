import moment from 'momentjs'

export const fromNow = (datetime) => moment(datetime, 'YYYYMMDD').fromNow()

