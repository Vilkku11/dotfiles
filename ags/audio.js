const audio = await Service.import("audio");

export const Volume = () => {
  const icons = {
    100: "overamplified",
    50: "high",
    25: "medium",
    1: "low",
    0: "muted",
  };

  const volumeIndicator = Widget.Button({
    on_clicked: () => (audio.speaker.is_muted = !audio.speaker.is_muted),
    child: Widget.Icon().hook(audio.speaker, (self) => {
      const vol = audio.speaker.volume * 100;
      const icon =
        icons[Math.max(...Object.keys(icons).filter((key) => key <= vol))];

      self.icon = `audio-volume-${icon}-symbolic`;
      self.tooltip_text = `Volume ${Math.floor(vol)}%`;
    }),
  });

  /* const getIcon = () => {
    //print(audio.speaker.is_muted);
    const keys = Object.keys(audio.speaker);
    keys.forEach((key) => print(key));
    //print(audio.speaker.block_signal_handler);
    const icon = audio.speaker.is_muted
      ? 0
      : [100, 50, 25, 1, 0].find(
          (threshold) => threshold <= audio.speaker.volume * 100
        );

    return `audio-volume-${icons[icon]}-symbolic`;
  };

  const icon = Widget.Icon({
    icon: Utils.watch(getIcon(), audio.speaker, getIcon),
  });*/

  const slider = Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => (audio.speaker.volume = value),
    setup: (self) =>
      self.hook(audio.speaker, () => {
        self.value = audio.speaker.volume || 0;
      }),
  });

  return Widget.Box({
    class_name: "volume",
    css: "min-width: 180px",
    children: [volumeIndicator, slider],
  });
};
