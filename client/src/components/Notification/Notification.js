import React,{useEffect} from "react";
import NotificationAlert from "react-notification-alert";

function Notifications({details}) {
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {details.msg} {details.change==="NCM"? " - No Changes Made": null}
          </div>
        </div>
      ),
      type: details.type,
      icon: details.icon?details.icon:"tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  
  useEffect(() => {
      notify('tr');
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);
  
  return (
    <>
        <NotificationAlert ref={notificationAlertRef} />
    </>
  );
}

export default Notifications;
