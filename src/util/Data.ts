export const DatePtBR = (Data: Date) => {
  return [
    ('0' + Data.getUTCDate()).slice(-2),
    ('0' + (Data.getUTCMonth() + 1)).slice(-2),
    Data.getUTCFullYear()
  ].join('/')
}

export const DateTimePtBR = (Data: Date) => {
  return `${('0' + Data.getHours()).slice(-2)}:${('0' + Data.getMinutes()).slice(-2)}:${('0' + Data.getSeconds()).slice(-2)}`
}

export const AddTimeInDateTime = (Data: Date, additionalDate: { h: number; m: number }) => {
  Data.setHours(Data.getHours() + additionalDate.h, Data.getMinutes() + additionalDate.m)
  //const dt = DateAndHour(Data)

  return { view: DateAndHour(Data), backend: Data }
}

export const DateAndHour = (Data: Date) => {
  return `${[
    ('0' + Data.getUTCDate()).slice(-2),
    ('0' + (Data.getUTCMonth() + 1)).slice(-2),
    Data.getUTCFullYear()
  ].join('/')} ${DateTimePtBR(Data)}`
}

export const parseDateBRToISO = (dateBR: string) => {
  const [day, month, year] = dateBR.split('/')
  return `${year}-${month}-${day}` // Formato ISO
}
export const DateModel = (Data: Date) => {
  return Data === null
    ? Data
    : Data.getFullYear() +
        '-' +
        ('0' + (Data.getUTCMonth() + 1)).slice(-2) +
        '-' +
        ('0' + Data.getUTCDate()).slice(-2)
}

export const DatePtBRInner = (Data: Date) => {
  return `${Data.getFullYear()}${('0' + (Data.getUTCMonth() + 1)).slice(-2)}${(
    '0' + Data.getDate()
  ).slice(-2)}`
}

export const getFirstDayOfMonthISO = (year: number, month: number) => {
  const date = new Date(Date.UTC(year, month, 1))
  // Retorna a data no formato ISO
  const now = new Date()
  const dayActual = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  )
  return { dayOne: date, dayActual: dayActual }
}
