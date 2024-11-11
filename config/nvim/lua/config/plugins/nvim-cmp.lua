return {
  "hrsh7th/nvim-cmp",
  event = "InsertEnter",
  dependencies = {
     "hrsh7th/cmp-buffer",
     "hrsh7th/cmp-path",
     {
        "L3MON4D3/LuaSnip",
        version = "v2.3.0",

     },

  },
  config = function()
    local cmp = require("cmp")

    cmp.setup({
      completion = {
        completeopt = "menu,menuone,preview,noselect",
      },
      snippet = {
        expand = function(args)
        end,
      },
      mapping = cmp.mapping.preset.insert({
        ["<C-k>"] = cmp.mapping.select_prev_item(),
        ["<C-j>"] = cmp.mapping.select_next_item(),
        ["<C-b>"] = cmp.mapping.scroll_docs(-4),
        ["<C-f>"] = cmp.mapping.scroll_docs(4),
        ["<C-Space>"] = cmp.mapping.complete(),
        ["<C-e>"] = cmp.mapping.abort(),
        ["<CR>"] = cmp.mapping.confirm({ select = false }),
      }),
      -- Order important!!!
      sources = cmp.config.sources({
        { name = "buffer" },
        { name = "path" },
      }),
    
      --formatting = {
      --  format = lspkind.cmp_format({
      --    maxwidth = 50,
      --    ellipsis_char = "...",
      --  }),
     -- },
    })
  end,
}
