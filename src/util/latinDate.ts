export const formatLatinDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(',', '')
    .split(' ')
    .reverse()
    .join(' ');
};
