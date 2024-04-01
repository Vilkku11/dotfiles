const hyprland = await Service.import("hyprland");

import { NotificationPopups } from "./notificationPopups.js";
import { SysTray } from "./systemTray.js";
import { Media } from "./media.js";
import { Volume } from "./audio.js";
import { Network } from "./network.js";
//import { Power } from "./power.js";
// TEST
import { applauncher } from "./applauncher.js";
import Calendar from "./clock/calendar.js";

// NEW PROPER MODULES
import { Clock } from "./clock/clock.js";
import { Power, PowerMenu } from "./power/power.js";

const compileSCSS = () => {
  Utils.exec(`sass ${App.configDir}/main.scss ${App.configDir}/style.css`);

  App.resetCss();
  App.applyCss(`${App.configDir}/style.css`);
  print("Compiled CSS");
};

compileSCSS();

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
  windows: [NotificationPopups(), Bar(), Calendar(), PowerMenu(), applauncher],
});
