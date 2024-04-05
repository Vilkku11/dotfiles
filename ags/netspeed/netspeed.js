const netspeed = Variable(
  { D: "test", U: "" },
  {
    listen: [
      App.configDir + "/netspeed/Netspeed",
      (out) => {
        return JSON.parse(out);
      },
    ],
  }
);

export const Netspeed = () => {
  return Widget.Box({
    class_name: "netspeed-container",
    vertical: true,
    children: [
      Widget.Box({
        vertical: false,
        children: [
          Widget.Icon({
            icon: "pan-up-symbolic",
            size: 20,
          }),
          Widget.Label({
            class_name: "netspeed",
            hpack: "center",
            label: netspeed.bind().as((value) => value["U"]),
          }),
        ],
      }),
      Widget.Box({
        vertical: false,
        children: [
          Widget.Icon({
            icon: "pan-down-symbolic",
            size: 20,
          }),
          Widget.Label({
            class_name: "netspeed",
            hpack: "center",
            label: netspeed.bind().as((value) => value["D"]),
          }),
        ],
      }),
    ],
  });
};
