const network = await Service.import("network");

export const Network = () => {
  const WifiIndicator = () =>
    Widget.Box({
      children: [
        Widget.Icon({
          icon: network.wifi.bind("icon_name"),
        }),
        Widget.Label({
          css: "margin-left: 5px;",
          label: network.wifi.bind("ssid").as((ssid) => ssid || "Unknown"),
        }),
      ],
    });

  const WiredIndicator = () =>
    Widget.Icon({
      icon: network.wired.bind("icon_name"),
    });

  const NetworkIndicator = () =>
    Widget.Stack({
      items: [
        ["wifi", WifiIndicator()],
        ["wired", WiredIndicator()],
      ],
      shown: network.bind("primary").as((p) => p || "wifi"),
    });

  return Widget.Box({
    class_name: "network",
    child: NetworkIndicator(),
  });
};
