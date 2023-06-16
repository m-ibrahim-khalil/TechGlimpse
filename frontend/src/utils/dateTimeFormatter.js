export default function dateTimeFormatter(timestamp) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  return new Date(timestamp).toLocaleString('en-US', options);
}
