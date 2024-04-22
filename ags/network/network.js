const network = await Service.import("network");

export const Network = () => {
  const wifiIndicator = () =>
    Widget.Box({
      child: Widget.Icon({
        class_name: "network-icon",
        icon: network.wifi.bind("icon_name"),
      }),
    });

  const wiredIndicator = () =>
    Widget.Box({
      child: Widget.Icon({
        class_name: "network-icon",
        icon: network.wired.bind("icon_name"),
      }),
    });

  /*const vpnIndicator = () => {
    Widget.Box({
      child: Widget.Icon({
        class_name: "network-icon",
        icon: network.vpn.bind("icon_name"),
      }),
    });
  };*/

  const indicator = () =>
    Widget.Stack({
      items: [
        ["wifi", wifiIndicator()],
        ["wired", wiredIndicator()],
        //["vpn", vpnIndicator()],
      ],
      shown: network.bind("primary").as((p) => p || "wifi"),
    });

  return Widget.Button({
    on_clicked: () => {
      network.wifi.scan();
      App.toggleWindow("Networkmenu");
    },
    class_name: "network",
    child: indicator(),
  });
};

const accessPoint = (obj) => {
  return Widget.Box({
    class_name: "network-item",
    children: [
      Widget.Icon({
        icon: obj.iconName,
      }),
      Widget.Label({
        label: obj.ssid,
      }),
    ],
    setup: (self) => {
      if (obj.active) {
        self.children = [Widget.Label({ label: "*" }), ...self.children];
      }
    },
  });
};

const accessPoints = Widget.Scrollable({
  hscroll: "never",
  vscroll: "automatic",
  class_name: "network-scrollable",
  child: Widget.Box({
    vertical: true,
    setup: (self) => {
      network.connect("changed", () => {
        const aps = network.wifi.access_points.sort(
          (a, b) => b.strength - a.strength
        );
        self.children = aps.map((item) => accessPoint(item));
      });
    },
  }),
});

export const NetworkMenu = () => {
  return Widget.Window({
    name: "Networkmenu",
    class_name: "network-menu",
    visible: false,
    anchor: ["top", "right"],
    margins: [4, 95],
    child: Widget.Box({
      class_name: "network-menu-box",
      vertical: true,
      children: [accessPoints],
    }),
  });
};
