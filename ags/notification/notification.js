import GLib from "gi://GLib";
import Pango from "gi://Pango";

const notificationIcon = (notification) => {
  if (notification.image) {
    return Widget.Box({
      vexpand: false,
      hexpand: false,
      vpack: "center",
      class_name: "notification-icon",
      css:
        `background-image: url("${notification.image}");` +
        "background-size: auto 100%;" +
        "background-repeat: no-repeat;" +
        "background-position: center;",
    });
  }
  let icon = "dialog-information-symbolic";
  if (Utils.lookUpIcon(notification.app_icon)) {
    icon = notification.app_icon;
  } else if (
    notification.app_entry &&
    Utils.lookUpIcon(notification.app_entry)
  ) {
    icon = notification.app_entry;
  }
  return Widget.Icon({
    class_name: "notification-icon",
    icon: icon,
  });
};

const Notification = (notification) =>
  Widget.Box({
    class_name: "notification",
    vertical: true,
    children: [
      Widget.EventBox({
        on_primary_click: (box) => {
          const label = box.child.children[1].children[1];
          if (label.lines < 0) {
            label.lines = 3;
            label.truncate = "end";
          } else {
            label.lines = -1;
            label.truncate = "none";
          }
        },
        child: Widget.Box({
          children: [
            notificationIcon(notification),
            Widget.Box({
              vertical: true,
              children: [
                Widget.Box({
                  children: [
                    Widget.Label({
                      class_name: "notification-title",
                      label: notification.summary,
                      justification: "left",
                      max_width_chars: 24,
                      truncate: "end",
                      wrap: true,
                      xalign: 0,
                      hexpand: true,
                    }),
                    Widget.Label({
                      class_name: "notification-time",
                      label: GLib.DateTime.new_from_unix_local(
                        notification.time
                      ).format("%H:%M"),
                    }),
                    Widget.Button({
                      class_name: "notification-close",
                      child: Widget.Icon("window-close-symbolic"),
                      on_clicked: () => {
                        notification.close();
                      },
                    }),
                  ],
                }),
                Widget.Label({
                  class_name: "notification-body",
                  justification: "left",
                  max_width_chars: 24,
                  lines: 3,
                  truncate: "end",
                  wrap_mode: Pango.WrapMode.WORD_CHAR,
                  xalign: 0,
                  wrap: true,
                  label: notification.body.replace(/(\r\n|\n|\r)/gm, " "),
                }),
                notification.hints.value
                  ? Widget.ProgressBar({
                      class_name: "notification-progress",
                      value: Number(notification.hints.value.unpack()) / 100,
                    })
                  : Widget.Box(),
              ],
            }),
          ],
        }),
      }),
      Widget.Box({
        spacing: 5,
        children: notification.actions.map((action) =>
          Widget.Button({
            child: Widget.Label(action.label),
            on_clicked: () => notification.invoke(action.id),
            class_name: "notification-action-button",
            hexpand: true,
          })
        ),
      }),
    ],
  });

export const NotificationReveal = (notification, visible = false) => {
  const secondRevealer = Widget.Revealer({
    child: Notification(notification),
    reveal_child: visible,
    transition: "slide_left",
    transition_duration: 200,
    setup: (revealer) => {
      Utils.timeout(1, () => {
        revealer.reveal_child = true;
      });
    },
  });

  const firstRevealer = Widget.Revealer({
    child: secondRevealer,
    reveal_child: true,
    transition: "slide_down",
    transition_duration: 200,
  });

  let box;

  const destroyWithAnims = () => {
    secondRevealer.reveal_child = false;
    Utils.timeout(200, () => {
      firstRevealer.reveal_child = false;
      Utils.timeout(200, () => {
        box.destroy();
      });
    });
  };
  box = Widget.Box({
    hexpand: true,
    hpack: "end",
    attribute: {
      destroyWithAnims: destroyWithAnims,
      count: 0,
    },
    children: [firstRevealer],
  });
  return box;
};
