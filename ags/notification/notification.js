const Notifications = await Service.import("notifications");

Notifications.popupTimeout = 5000;
Notifications.forceTimeout = false;
Notifications.cacheActions = false;
Notifications.clearDelay = 100;
Notifications.dnd = false;

export const NotificationWidget = () => {
  return Widget.Button({
    on_clicked: () => {
      App.toggleWindow("Notificationmenu");
    },
    child: Widget.Label({
      class_name: "notification-widget",
      label: Notifications.bind("notifications").as((n) => `${n.length}`),
    }),
  });
};

const notificationItem = (item) => {
  return Widget.Box({
    vertical: false,
    children: [Widget.Label({ label: item.summary })],
  });
};

const notificationList = Widget.Scrollable({
  hscroll: "never",
  vscroll: "automatic",
  class_name: "notification-scrollable",
  child: Widget.Box({
    vertical: true,
    setup: (self) => {
      const updateList = () => {
        self.children = Notifications.notifications.map((item) =>
          notificationItem(item)
        );
      };
      Notifications.connect("notified", updateList);
      Notifications.connect("closed", updateList);
    },
  }),
});

export const NotificationList = () => {
  return Widget.Window({
    name: "Notificationmenu",
    class_name: "notification-menu",
    visible: false,
    anchor: ["top", "right"],
    margins: [4, 95],
    child: Widget.Box({
      class_name: "notification-menu-box",
      vertical: true,
      children: [
        notificationList,
        Widget.Box({
          vertical: false,
          children: [
            Widget.Button({
              on_clicked: () => {
                print("clear all");
                Notifications.clear();
              },
              child: Widget.Label({ label: "Clear all" }),
            }),
            Widget.Button({
              on_clicked: () => {
                print("DO NOT DISTURB PRESSED");
              },
              child: Widget.Label({ label: "Do not disturb" }),
            }),
          ],
        }),
      ],
    }),
  });
};
