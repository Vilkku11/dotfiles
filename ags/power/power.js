export const Power = () =>
  Widget.Button({
    on_clicked: () => {
      print("powerbutton clicked");
      App.toggleWindow("Powermenu");
    },
    class_name: "power-button",
    child: Widget.Icon({
      class_name: "power-icon",
      icon: "system-shutdown-symbolic",
    }),
  });

const powerButton = (name, icon, size, command) => {
  return Widget.Button({
    class_name: "power-menu-button",
    on_clicked: command,
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Icon({
          icon: icon,
          size: size,
        }),
        Widget.Label({
          class_name: "power-menu-button-label",
          hpack: "center",
          label: name,
        }),
      ],
    }),
  });
};

export const PowerMenu = () => {
  return Widget.Window({
    name: "Powermenu",
    class_name: "power-menu",
    visible: false,
    keymode: "exclusive",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.closeWindow("Powermenu");
      }),
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Label({
          class_name: "power-menu-label",
          label: "?",
        }),
        Widget.Box({
          vertical: false,
          children: [
            powerButton("Sleep", "system-lock-screen-symbolic", 60, () => {
              print("sleep");
              App.toggleWindow("Powermenu");
            }),
            powerButton("Reboot", "system-reboot-symbolic", 60, () => {
              print("Rebootbutton pressed");
              App.toggleWindow("Powermenu");
              Utils.execAsync("reboot");
            }),
            powerButton("Shutdown", "system-shutdown-symbolic", 60, () => {
              print("shutdown");
              App.toggleWindow("Powermenu");
              Utils.execAsync("poweroff");
            }),
            powerButton("Logout", "system-log-out-symbolic", 60, () => {
              print("Logout");
              App.toggleWindow("Powermenu");
              Utils.execAsync("hyprctl dispatch exit");
            }),
          ],
        }),
      ],
    }),
  });
};
