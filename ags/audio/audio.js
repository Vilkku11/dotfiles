const audio = await Service.import("audio");

const icons = {
  100: "overamplified",
  50: "high",
  25: "medium",
  1: "low",
  0: "muted",
};

const volumeIndicator = Widget.Button({
  //on_clicked: () => (audio.speaker.is_muted = !audio.speaker.is_muted),
  on_clicked: () => {
    App.toggleWindow("Volumemenu");
  },
  child: Widget.Icon().hook(audio.speaker, (self) => {
    const vol = audio.speaker.volume * 100;
    const icon = audio.speaker.is_muted
      ? "audio-volume-muted-symbolic"
      : icons[Math.max(...Object.keys(icons).filter((key) => key <= vol))];
    self.icon = `audio-volume-${icon}-symbolic`;
    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
    self.size = 20;
  }),
});

const volumeSlider = Widget.Slider({
  class_name: "volume-slider",
  hexpand: true,
  draw_value: false,
  on_change: ({ value }) => (audio.speaker.volume = value),
  setup: (self) =>
    self.hook(audio.speaker, () => {
      self.value = audio.speaker.volume || 0;
    }),
});

export const Volume = () => {
  return Widget.Box({
    children: [volumeIndicator],
  });
};

export const VolumeMenu = () => {
  return Widget.Window({
    name: "Volumemenu",
    class_name: "volume-menu",
    visible: false,
    anchor: ["top", "right"],
    margins: [4, 95],
    child: Widget.Box({
      class_name: "volume-menu-box",
      vertical: true,
      children: [
        Widget.Label().hook(audio.speaker, (self) => {
          const vol = Math.floor(audio.speaker.volume * 100);
          self.label = audio.speaker.is_muted ? "Mute" : `Vol: ${vol}%`;
        }),
        volumeSlider,
      ],
    }),
  });
};
