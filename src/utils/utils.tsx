function timeConvert(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return "now";
  }

  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  }

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  }

  return `${Math.floor(diffInDays)} days ago`;
}
function getRandomQuestion(): any {
  const randomQuestion = Math.floor(Math.random() * 1000).toString();
  console.log(randomQuestion);

  return randomQuestion;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export { timeConvert, getRandomQuestion, formatTimestamp };
