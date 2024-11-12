return {
  "williamboman/mason.nvim",
  dependencies = {
    "williamboman/mason-lspconfig.nvim",
  },
  config = function()
    local mason = require("mason")
    local mason_lspconfig = require("mason-lspconfig")

    mason.setup()

    mason_lspconfig.setup({
      ensure_installed = {
        "bashls",
        "clangd",
        "cssls",
        "html",
        "ts_ls",
        --"sqls",
        "lua_ls",
        "rust_analyzer",
        "ruff",
        "psalm",

      },
    })
  end,
}
