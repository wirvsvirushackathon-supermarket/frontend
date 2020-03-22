import { eachDayOfInterval, add, format, setHours } from 'date-fns'

export const getRandomSlots = (maxSlots: number): any => {
  const week = eachDayOfInterval({
    start: new Date(),
    end: add(new Date(), { days: 6 })
  })

  const res = week.map(ele => {
    let slotsForDay: any = []
    for (let i = 0; i < Math.floor(Math.random() * 6) + 5; i += 1) {
      slotsForDay = [
        ...slotsForDay,
        {
          start: format(
            add(setHours(ele, 8), { hours: i }),
            "yyyy-MM-dd'T'hh:mm:ss"
          ),
          available: Math.floor(Math.random() * maxSlots) + 1,
          slotSize: 'PT60M'
        }
      ]
    }
    return slotsForDay
  })
  return res
}
