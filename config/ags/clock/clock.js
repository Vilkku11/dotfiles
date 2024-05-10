const time = Variable("00:00:00", {
  poll: [1000, ["date", "+%H:%M:%S"]],
});

const date = Variable("placeholder", {
  listen: App.configDir + "/clock/date.sh",
});

export const Clock = () =>
  Widget.Button({
    on_clicked: () => {
      App.toggleWindow("Calendar");
    },
    child: Widget.Box({
      class_name: "clock-container",
      vertical: true,
      children: [
        Widget.Label({
          class_name: "clock-time",
          hpack: "center",
          label: time.bind(),
        }),
        Widget.Label({
          class_name: "clock-date",
          hpack: "center",
          label: date.bind(),
        }),
      ],
    }),
  });
