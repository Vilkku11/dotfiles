local wezterm = require("wezterm")

local config = wezterm.config_builder()

require('config.base').apply_to_config(config)
require('config.colors').apply_to_config(config)
require('config.background_toggle').apply_to_config(config)
require('config.keybindings').apply_to_config(config)




return config