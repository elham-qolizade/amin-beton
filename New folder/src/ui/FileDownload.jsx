import Button from "./Button";

/*eslint-disable */
const FileDownload = ({ fileDataUrl, disabled }) => {
  // handler
  function handleDownloadFile() {
    const link = document.createElement("a");
    link.href = fileDataUrl;
    link.download = "transport_panel_downloaded_file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <Button
        variation="secondary"
        size="small"
        onClick={handleDownloadFile}
        disabled={disabled}
      >
        Download File
      </Button>
    </div>
  );
};

export default FileDownload;
