const calendar = Widget.Calendar({
  showDayNames: true,
  showDetails: true,
  showHeading: true,
  showWeekNumbers: true,
  class_name: "calendar",
  detail: (self, m, d) => {
    return `<span color="white"></span>`;
  },
});

const Calendar = (monitor = 0) => {
  return Widget.Window({
    name: "Calendar",
    class_name: "calendar-window",
    monitor,
    visible: false,
    anchor: ["top", "right"],
    margins: [4, 95],
    child: Widget.Box({
      vertical: true,
      child: calendar,
    }),
  });
};

export default Calendar;
