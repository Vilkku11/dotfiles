const notifications = await Service.import("notifications");
import { NotificationReveal } from "./notification.js";

const popups = () =>
  Widget.Box({
    vertical: true,
    spacing: 5,
    hpack: "end",
    attribute: {
      map: new Map(),

      dismiss: (box, id) => {
        if (!box.attribute.map.has(id)) {
          return;
        }
        const notif = box.attribute.map.get(id);
        if (notif.attribute.count <= 0) {
          box.attribute.map.delete(id);
          notif.attribute.destroyWithAnims();
        }
      },
      notify: (box, id) => {
        const notif = notifications.getNotification(id);
        if (notifications.dnd || !notif) {
          return;
        }
        const replace = box.attribute.map.get(id);
        if (!replace) {
          const notification = NotificationReveal(notif, true);
          box.attribute.map.set(id, notification);
          notification.attribute.count = 1;
          box.pack_start(notification, false, false, 0);
        } else {
          const notification = NotificationReveal(notif, true);
          notification.attribute.count = replace.attribute.count + 1;
          box.remove(replace);
          replace.destroy();
          box.pack_start(notification, false, false, 0);
          box.attribute.map.set(id, notification);
        }
      },
    },
  })
    .hook(notifications, (box, id) => box.attribute.notify(box, id), "notified")
    .hook(
      notifications,
      (box, id) => box.attribute.dismiss(box, id),
      "dismissed"
    )
    .hook(notifications, (box, id) => box.attribute.dismiss(box, id), "closed");

const popupList = () =>
  Widget.Box({
    class_name: "notificatios-popup-list",
    css: "padding: 1px 0px 1px 1px",
    children: [popups()],
  });

export default () =>
  Widget.Window({
    layer: "overlay",
    name: "popupNotifications",
    anchor: ["top", "right"],
    child: popupList(),
    visible: false,
  }).hook(
    notifications,
    () => {
      if (notifications.popups.length > 0) App.openWindow("popupNotifications");
      else App.closeWindow("popupNotifications");
    },
    "notify::popups"
  );
