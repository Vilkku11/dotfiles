const hyprland = await Service.import("hyprland");
const notifications = await Service.import("notifications");

//import { SysTray } from "./systemTray.js";
import { Media } from "./media.js";
import { Network } from "./network.js";
// TEST
//import { applauncher } from "./applauncher.js";
import Calendar from "./clock/calendar.js";

// NEW PROPER MODULES
import { Clock } from "./clock/clock.js";
import { Power, PowerMenu } from "./power/power.js";
import { Volume, VolumeMenu } from "./audio/audio.js";
import { SystemTray } from "./systemtray/systemTray.js";
import { Netspeed } from "./netspeed/netspeed.js";
import { Applauncher } from "./applauncher/applauncher.js";

import { ClientTitle } from "./clienttitle/clientTitle.js";

//import { notificationReveal } from "./notification/notification.js";
//import { notification } from "./notification/notification.js";
import popup from "./notification/popup.js";
//import { NotificationPopups } from "./notificationPopups.js";

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
    children: [
      //Media(),
      Netspeed(),
      SystemTray(),
      Network(),
      Volume,
      Clock(),
      Power(),
    ],
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

notifications.popupTimeout = 5000;
notifications.forceTimeout = true;

App.config({
  style: App.configDir + "/style.css",
  windows: [
    //NotificationPopups(),
    Bar(),
    Calendar(),
    PowerMenu(),
    VolumeMenu(),
    popup(),
    Applauncher,
  ],
});
