const hyprland = await Service.import("hyprland");

import { NotificationPopups } from "./notificationPopups.js";
import { SysTray } from "./systemTray.js";
import { Media } from "./media.js";
import { Volume } from "./audio.js";
import { Network } from "./network.js";
import { Power } from "./power.js";
// TEST
import { applauncher } from "./applauncher.js";

const Workspaces = () => {
  const activeId = hyprland.active.workspace.bind("id");
  const workspaces = hyprland.bind("workspaces").as((ws) =>
    ws.map(({ id }) =>
      Widget.Button({
        on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
        child: Widget.Label(`${id}`),
        class_name: activeId.as((i) => `${i === id ? "focused" : ""}`),
      })
    )
  );

  return Widget.Box({
    class_name: "workspaces",
    children: workspaces,
  });
};

const ClientTitle = () => {
  return Widget.Label({
    class_name: "client-title",
    label: hyprland.active.client.bind("title"),
  });
};

// Clock

const date = Variable("", {
  poll: [1000, 'date "+%H:%M:%S %b %e"'],
});

const Clock = () => {
  return Widget.Label({
    class_name: "clock",
    label: date.bind(),
  });
};

// Item holders

const Left = () => {
  return Widget.Box({
    spacing: 8,
    children: [Workspaces(), ClientTitle()],
  });
};

const Right = () => {
  return Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [SysTray(), Network(), Media(), Volume(), Clock(), Power()],
  });
};

const Bar = (monitor = 0) => {
  return Widget.Window({
    name: `bar-${monitor}`,
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      start_widget: Left(),
      end_widget: Right(),
    }),
  });
};

App.config({
  style: App.configDir + "/style.css",
  windows: [NotificationPopups(), Bar()],
});

App.config({
  style: App.configDir + "/style.css",
  windows: [applauncher],
});
