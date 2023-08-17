export const dateParser = (date: string) => {
    const result = new Date(date);
   return result.toLocaleString('ru', {
       year: 'numeric',
       month: 'long',
       day: 'numeric',
   });
};

export const datePicker = (index: number = 1) => {
    const date = new Date();
    const today = date.setDate(date.getDate() + index);
    const todayString = new Date(today).toJSON().slice(0,10);
    const nextDay = date.setDate(date.getDate() + 1);
    const nextdayString = new Date(nextDay).toJSON().slice(0,10);
    return { todayString, nextdayString };
}