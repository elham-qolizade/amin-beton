/*eslint-disable */
import Button from "./Button";

function DownloadButton({
  fileDataUrl,
  downloadedFileName = "download",
  variation = "primary",
  buttonText = "دانلود",
  disabled = false,
}) {
  // handler
  function handleDownloadFile() {
    const link = document.createElement("a");
    link.href = fileDataUrl;
    link.download = downloadedFileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Button
      variation={variation}
      size="small"
      onClick={handleDownloadFile}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
}

export default DownloadButton;
