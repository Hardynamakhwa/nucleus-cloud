export const formatDate = (date: string, format?: string = "MMM DD, YYYY [at] HH:mm") => dayjs(date).format(format);
