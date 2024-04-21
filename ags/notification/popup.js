const notifications = await Service.import("notifications");

const notificationIcon = ({ app_entry, app_icon, image }) => {
  if (image) {
    return Widget.Box({
      css:
        `background-image: url("${image}");` +
        "background-size: contain;" +
        "background-repeat: no-repeat;" +
        "background-position: center;",
    });
  }

  let icon = "dialog-information-symbolic";
  if (Utils.lookUpIcon(app_icon)) icon = app_icon;

  if (app_entry && Utils.lookUpIcon(app_entry)) icon = app_entry;

  return Widget.Box({
    child: Widget.Icon({
      class_name: "notification-icon",
      icon: icon,
    }),
  });
};

export const notification = (n) => {
  const icon = Widget.Box({
    vpack: "start",
    class_name: "notification-icon",
    child: notificationIcon(n),
  });

  const title = Widget.Label({
    class_name: "notification-title",
    xalign: 0,
    justification: "left",
    hexpand: true,
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: n.summary,
    use_markup: true,
  });

  const body = Widget.Label({
    class_name: "notification-body",
    hexpand: true,
    use_markup: true,
    xalign: 0,
    justification: "left",
    max_width_chars: 30,
    truncate: "end",
    label: n.body,
    wrap: true,
  });

  const notificationButtons = () => {
    return Widget.Button({
      class_name: "notification-actions-button",
      on_clicked: () => {
        n.invoke(id);
        n.dismiss();
      },
      hexpand: true,
      child: Widget.Label(label),
    });
  };

  const actions = Widget.Box({
    class_name: "notification-actions",
    children: [
      Widget.Button({
        class_name: "notification-actions-button",
        on_clicked: () => {
          print("dismiss button pressed");
          n.dismiss();
          n.close();
        },
        hexpand: true,
        child: Widget.Label("Dismiss"),
      }),
    ],
    setup: (self) => {
      self.children = [
        self.children[0],
        ...n.actions.map(({ id, label }) => notificationButtons(id, label)),
      ];
    },
  });

  return Widget.EventBox(
    {
      attribute: { id: n.id },
      on_primary_click: n.dismiss,
    },
    Widget.Box(
      {
        class_name: `notification ${n.urgency}`,
        vertical: true,
      },
      Widget.Box([icon, Widget.Box({ vertical: true }, title, body)]),
      actions
    )
  );
};

export const NotificationPopups = () => {
  const list = Widget.Box({
    vertical: true,
    children: notifications.popups.map(notification),
  });

  const onNotified = (_, id) => {
    const n = notifications.getNotification(id);
    if (n) list.children = [notification(n), ...list.children];
  };

  const onDismissed = (_, id) => {
    list.children.find((n) => n.attribute.id === id)?.destroy();
  };

  list
    .hook(notifications, onNotified, "notified")
    .hook(notifications, onDismissed, "dismissed");

  return Widget.Window({
    name: `notification-window`,
    class_name: "notification-window",
    anchor: ["top", "right"],
    child: Widget.Box({
      css: "min-width: 2px; min-height: 2px;",
      class_name: "notifications-window-list",
      vertical: true,
      child: list,
    }),
  });
};
