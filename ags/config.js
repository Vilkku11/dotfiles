//const notifications = await Service.import("notifications");

//import { SysTray } from "./systemTray.js";
//import { Media } from "./media.js";
//import { Network } from "./network.js";
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
import { Network, NetworkMenu } from "./network/network.js";
import { Workspaces } from "./workspaces/workspaces.js";

import { ClientTitle } from "./clienttitle/clientTitle.js";

import {
  NotificationWidget,
  NotificationList,
} from "./notification/notification.js";
import { NotificationPopups } from "./notification/popup.js";

const compileSCSS = () => {
  Utils.exec(`sass ${App.configDir}/main.scss ${App.configDir}/style.css`);

  App.resetCss();
  App.applyCss(`${App.configDir}/style.css`);
  print("Compiled CSS");
};

compileSCSS();

// Item holders

const Left = () => {
  return Widget.Box({
    spacing: 8,
    children: [Workspaces()],
  });
};

const Middle = () => {
  return Widget.Box({
    hpack: "center",
    spacing: 8,
    children: [ClientTitle()],
  });
};

const Right = () => {
  return Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      Netspeed(),
      NotificationWidget(),
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
      center_widget: Middle(),
      end_widget: Right(),
    }),
  });
};

App.config({
  style: App.configDir + "/style.css",
  windows: [
    //NotificationPopups(),
    Bar(),
    Calendar(),
    PowerMenu(),
    VolumeMenu(),
    NetworkMenu(),
    Applauncher,
    NotificationList(),
    NotificationPopups(),
  ],
});
