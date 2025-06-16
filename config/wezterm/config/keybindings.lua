local wezterm = require("wezterm")

local module = {}

local bg_toggle = require("config.background_toggle")

function module.apply_to_config(config)
    config.window_background_opacity = bg_toggle.opacity
    config.text_background_opacity = 1.0

    config.keys = {
        {
            key = 'b',
            mods = 'CTRL|ALT',
            action = wezterm.action.EmitEvent 'toggle-opacity',

        },
    }
end

return module