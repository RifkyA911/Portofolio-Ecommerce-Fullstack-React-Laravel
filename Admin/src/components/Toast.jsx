export const Toast = (props) => {
  return (
    <>
      <div>
        <div className="list-toast">
          <div className="toast toast-start z-[20]">
            <div className="alert alert-success">
              <span>New mail arrived.</span>
            </div>
            <div className="alert alert-error">
              <span>Message sent successfully.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
