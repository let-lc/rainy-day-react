export const formatTime = (time: number) => {
  const int = Math.floor(time);
  const seconds = int % 60;
  const minutes = Math.floor((int % 3600) / 60);
  const hours = Math.floor(int / 3600);
  return (
    hours +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
};
