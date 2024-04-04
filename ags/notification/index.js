const notifications = await Service.import("notifications");
import { NotificationReveal } from "./notification.js";
import popup from "./popup.js";
import { NotificationList } from "./notificationList.js";

const NotificationsIndicator = () =>
  Widget.Icon({
    icon: icons.notifications.noisy,
    class_name: "notification-indicator",
    visible: Notifications.bind("notifications").transform(
      (nots) => nots.length > 0
    ),
  });

const DNDIndicator = () =>
  Widget.Icon({
    icon: icons.notifications.silent,
    class_name: "notification-indicator",
    visible: Notifications.bind("dnd"),
  });

export const NotificationIndicator = () =>
  Widget.Box({
    class_name: "notification-indicator-container",
    children: [NotificationsIndicator(), DNDIndicator()],
  });

export { NotificationReveal, popup };
export default NotificationList;
